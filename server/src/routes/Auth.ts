import {
  AuthenticatorTransportFuture,
  CredentialDeviceType,
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { IncomingMessage } from "http";
import { uniqueId } from "lodash-es";
import {
  All,
  Event,
  EventType,
  Of,
  RPC,
  Transport,
  TransportEvent,
} from "silentium";
import {
  Concatenated,
  First,
  Path,
  RecordOf,
  Router,
} from "silentium-components";
import { Created } from "../modules/mongo/Created";
import { List } from "../modules/mongo/List";
import { RequestBody } from "../modules/node/RequestBody";
import { Query } from "../modules/string/Query";
import { PassKeyConfigType } from "../types/PassKeyConfigType";

type UserModel = {
  id: any;
  username: string;
};

type Passkey = {
  id: Base64URLString;
  publicKey: Uint8Array;
  user: UserModel;
  webauthnUserID: Base64URLString;
  counter: number;
  deviceType: CredentialDeviceType;
  backedUp: boolean;
  transports?: AuthenticatorTransportFuture[];
};

type PassKeyChallenge = { challenge: any; user: any };

function UserPasskeys($username: EventType<string>): EventType<Passkey[]> {
  return List(
    "user-passkeys",
    RecordOf({
      "user.username": $username,
    }),
  );
}

function ConcretePassKey(
  $username: EventType,
  $id: EventType,
): EventType<Passkey> {
  return First(
    List(
      "user-passkeys",
      RecordOf({
        "user.username": $username,
        "user.id": $id,
      }),
    ),
  );
}

function NewPassKey($form: EventType) {
  return Created($form, "user-passkeys");
}

function PassKeyConfig() {
  return RPC<PassKeyConfigType>(
    Of({ transport: "config", method: "get" }),
  ).result();
}

export function Auth($req: EventType<IncomingMessage>): EventType {
  return Event((transport) => {
    const $config = RPC<PassKeyConfigType>(
      Of({ transport: "config", method: "get" }),
    ).result();

    const rd = Router(
      Query($req),
      Of([
        {
          pattern: "^POST:/auth/registration/start$",
          event: TransportEvent(() =>
            Event<unknown>((transport) => {
              const $body = RequestBody($req);
              const $passkeys = UserPasskeys(Path($body, Of("username")));
              All($config, $body, $passkeys).event(
                Transport(async ([config, body, passkeys]) => {
                  const { username } = body;
                  const options: PublicKeyCredentialCreationOptionsJSON =
                    await generateRegistrationOptions({
                      rpName: config.rpName,
                      rpID: config.rpID,
                      userName: username,
                      attestationType: "none",
                      excludeCredentials: passkeys.map((passkey) => ({
                        id: passkey.id,
                        transports: passkey.transports,
                      })),
                      authenticatorSelection: {
                        residentKey: "preferred",
                        userVerification: "preferred",
                        authenticatorAttachment: "platform",
                      },
                    });
                  RPC(
                    Of({
                      transport: "cache",
                      method: "put",
                      params: {
                        key: username,
                        value: options,
                      },
                    }),
                  );
                  transport.use({
                    data: options,
                  });
                }),
              );
            }),
          ),
        },
        {
          pattern: "^POST:/auth/registration/finish$",
          event: TransportEvent(() =>
            Event<unknown>((transport) => {
              const $config = RPC<PassKeyConfigType>(
                Of({ transport: "config", method: "get" }),
              ).result();
              const $body = RequestBody<Record<string, any>>($req);
              const $options = RPC<PassKeyChallenge>(
                RecordOf({
                  transport: Of("cache"),
                  method: Of("get"),
                  params: RecordOf({
                    key: Path($body, Of("username")),
                  }),
                }),
              ).result();
              All($body, $options, $config).event(
                Transport(async ([data, options, config]) => {
                  let verification;
                  try {
                    verification = await verifyRegistrationResponse({
                      response: data.data,
                      expectedChallenge: options.challenge,
                      expectedOrigin: config.origin,
                      expectedRPID: config.rpID,
                      requireUserVerification: false,
                    });
                    const { verified, registrationInfo } = verification;
                    if (verified) {
                      const {
                        credential,
                        credentialDeviceType,
                        credentialBackedUp,
                      } = registrationInfo;
                      NewPassKey(
                        Of({
                          user: {
                            id: uniqueId(),
                            username: data.username,
                          },
                          webAuthnUserID: options.user.id,
                          id: credential.id,
                          publicKey: credential.publicKey,
                          counter: credential.counter,
                          transports: credential.transports,
                          deviceType: credentialDeviceType,
                          backedUp: credentialBackedUp,
                        }),
                      );
                      transport.use({
                        result: true,
                      });
                      return;
                    }
                  } catch (error) {
                    transport.use({
                      status: 400,
                      error: error.message,
                    });
                    return;
                  }
                  transport.use({
                    status: 500,
                    error: "Unable to register",
                  });
                }),
              );
            }),
          ),
        },
        {
          pattern: "^POST:/auth/login/start$",
          event: TransportEvent(() =>
            Event<unknown>((transport) => {
              const $body = RequestBody<Record<string, any>>($req);
              const $passkeys = UserPasskeys(Path($body, Of("username")));
              const $config = PassKeyConfig();
              All($body, $passkeys, $config).event(
                Transport(async ([body, passkeys, config]) => {
                  const options: PublicKeyCredentialRequestOptionsJSON =
                    await generateAuthenticationOptions({
                      rpID: config.rpID,
                      allowCredentials: passkeys.map((passkey) => ({
                        id: passkey.id,
                        transports: passkey.transports,
                      })),
                    });
                  RPC(
                    Of({
                      transport: "cache",
                      method: "put",
                      params: {
                        key: `${body.username}-login`,
                        value: options,
                      },
                    }),
                  );
                  transport.use({
                    data: options,
                  });
                }),
              );
            }),
          ),
        },
        {
          pattern: "^POST:/auth/login/finish$",
          event: TransportEvent(() =>
            Event<unknown>((transport) => {
              const $body = RequestBody<Record<string, any>>($req);
              const $username = Path($body, Of("username"));
              const $id = Path($body, Of("id"));
              const $passkeys = ConcretePassKey($username, $id);
              const $options = RPC<PassKeyChallenge>(
                RecordOf({
                  transport: Of("cache"),
                  method: Of("get"),
                  params: RecordOf({
                    key: Concatenated([$username, Of("-login")]),
                  }),
                }),
              ).result();
              const $config = PassKeyConfig();
              All($body, $passkeys, $options, $config).event(
                Transport(async ([body, passkey, options, config]) => {
                  try {
                    const verification = await verifyAuthenticationResponse({
                      response: body as any,
                      expectedChallenge: options.challenge,
                      expectedOrigin: origin,
                      expectedRPID: config.rpID,
                      credential: {
                        id: passkey.id,
                        publicKey: passkey.publicKey as any,
                        counter: passkey.counter,
                        transports: passkey.transports,
                      },
                    });
                    const { verified } = verification;
                    transport.use({
                      verified,
                    });
                    return;
                  } catch (error) {
                    transport.use({
                      status: 400,
                      error: error.message,
                    });
                    return;
                  }
                }),
              );
            }),
          ),
        },
      ]),
      TransportEvent(() =>
        Of({
          error: "Auth route not found",
          status: 404,
        }),
      ),
    ).event(transport);

    return () => {
      rd.destroy();
    };
  });
}
