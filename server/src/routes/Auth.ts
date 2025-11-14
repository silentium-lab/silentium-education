import {
  AuthenticatorTransportFuture,
  CredentialDeviceType,
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { IncomingMessage } from "http";
import { ObjectId } from "mongodb";
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
import { List } from "../modules/mongo/List";
import { RequestBody } from "../modules/node/RequestBody";
import { Query } from "../modules/string/Query";
import { PassKeyConfigType } from "../types/PassKeyConfigType";
import { v4 as uuidv4 } from "uuid";
import cookie from "cookie";

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

function ConcretePassKey($username: EventType): EventType<Passkey> {
  return First(
    List(
      "user-passkeys",
      RecordOf({
        "user.username": $username,
      }),
    ),
  );
}

function UpdateCounter(
  $passkey: EventType<Passkey>,
  $counter: EventType<number>,
) {
  return RPC(
    RecordOf({
      transport: Of("db"),
      method: Of("updateOne"),
      params: RecordOf({
        collection: Of("user-passkeys"),
        args: All(
          RecordOf({
            _id: Path($passkey, Of("_id")),
          }),
          RecordOf({
            $set: RecordOf({
              counter: $counter,
            }),
          }),
        ),
      }),
    }),
  );
}

function NewPassKey($form: EventType) {
  return RPC(
    RecordOf({
      transport: Of("db"),
      method: Of("insertOne"),
      params: RecordOf({
        collection: Of("user-passkeys"),
        args: All($form),
      }),
    }),
  );
}

function PassKeyConfig() {
  return RPC<PassKeyConfigType>(
    Of({ transport: "config", method: "get" }),
  ).result();
}

function NewCookie($key: EventType, $value: EventType, $ttl?: EventType) {
  return RPC(
    RecordOf({
      transport: Of("cookie"),
      method: Of("set"),
      params: RecordOf({
        key: $key,
        value: $value,
        ttl: $ttl ?? Of(86400),
      }),
    }),
  );
}

function NewSession($key: EventType, $value: EventType, $ttl?: EventType) {
  return RPC(
    RecordOf({
      transport: Of("cache"),
      method: Of("put"),
      params: RecordOf({
        key: $key,
        value: $value,
        ttl: $ttl ?? Of(86400),
      }),
    }),
  );
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
                  ).result();
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
                            id: new ObjectId().toString(),
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
                      ).result();
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
                  ).result();
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
              const $passkey = ConcretePassKey($username);
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
              All($body, $passkey, $options, $config).event(
                Transport(async ([body, passkey, options, config]) => {
                  try {
                    const verification = await verifyAuthenticationResponse({
                      response: body.data as any,
                      expectedChallenge: options.challenge,
                      expectedOrigin: config.origin,
                      expectedRPID: config.rpID,
                      requireUserVerification: false,
                      credential: {
                        id: passkey.id,
                        publicKey: new Uint8Array(
                          passkey.publicKey.buffer as any,
                        ),
                        counter: passkey.counter,
                        transports: passkey.transports,
                      },
                    });
                    const { verified } = verification;

                    let authId = "";
                    if (verified) {
                      const { authenticationInfo } = verification;
                      const { newCounter } = authenticationInfo;
                      UpdateCounter(Of(passkey), Of(newCounter)).result();
                      authId = uuidv4();
                      NewSession(Of("sid"), Of(authId), Of(3600)).result();
                    }

                    transport.use({
                      verified,
                      ...(authId
                        ? {
                            headers: {
                              "Access-Control-Allow-Origin":
                                "http://localhost:1234",
                              "Access-Control-Allow-Credentials": "true",
                              "Set-Cookie": cookie.serialize("sid", authId, {
                                httpOnly: true,
                                sameSite: "lax",
                                path: "/",
                                secure: false,
                                expires: new Date(Date.now() + 3600000000),
                              }),
                            },
                          }
                        : {}),
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
