import {
  AuthenticatorTransportFuture,
  CredentialDeviceType,
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import cookie from "cookie";
import { IncomingMessage } from "http";
import { ObjectId } from "mongodb";
import {
  All,
  Message,
  MessageType,
  Of,
  RPC,
  Transport,
  TransportMessage,
} from "silentium";
import {
  Concatenated,
  First,
  Path,
  Record,
  Router,
} from "silentium-components";
import { v4 as uuidv4 } from "uuid";
import { List } from "../modules/mongo/List";
import { RequestBody } from "../modules/node/RequestBody";
import { Query } from "../modules/string/Query";
import { PassKeyConfigType } from "../types/PassKeyConfigType";
import { NewSid } from "../models/auth/Sid";

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

function UserPasskeys($username: MessageType<string>): MessageType<Passkey[]> {
  return List(
    "user-passkeys",
    Record({
      "user.username": $username,
    }),
  );
}

function ConcretePassKey($username: MessageType): MessageType<Passkey> {
  return First(
    List(
      "user-passkeys",
      Record({
        "user.username": $username,
      }),
    ),
  );
}

function UpdateCounter(
  $passkey: MessageType<Passkey>,
  $counter: MessageType<number>,
) {
  return RPC(
    Record({
      transport: Of("db"),
      method: Of("updateOne"),
      params: Record({
        collection: Of("user-passkeys"),
        args: All(
          Record({
            _id: Path($passkey, Of("_id")),
          }),
          Record({
            $set: Record({
              counter: $counter,
            }),
          }),
        ),
      }),
    }),
  );
}

function NewPassKey($form: MessageType) {
  return RPC(
    Record({
      transport: Of("db"),
      method: Of("insertOne"),
      params: Record({
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

export function Auth($req: MessageType<IncomingMessage>) {
  return Message((transport) => {
    const $config = RPC<PassKeyConfigType>(
      Of({ transport: "config", method: "get" }),
    ).result();

    const rd = Router(
      Query($req),
      Of([
        {
          pattern: "^POST:/auth/registration/start$",
          message: TransportMessage(() =>
            Message<unknown>((transport) => {
              const $body = RequestBody($req);
              const $passkeys = UserPasskeys(Path($body, Of("username")));
              All($config, $body, $passkeys).to(
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
          message: TransportMessage(() =>
            Message<unknown>((transport) => {
              const $config = RPC<PassKeyConfigType>(
                Of({ transport: "config", method: "get" }),
              ).result();
              const $body = RequestBody<Record<string, any>>($req);
              const $options = RPC<PassKeyChallenge>(
                Record({
                  transport: Of("cache"),
                  method: Of("get"),
                  params: Record({
                    key: Path($body, Of("username")),
                  }),
                }),
              ).result();
              All($body, $options, $config).to(
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
          message: TransportMessage(() =>
            Message<unknown>((transport) => {
              const $body = RequestBody<Record<string, any>>($req);
              const $passkeys = UserPasskeys(Path($body, Of("username")));
              const $config = PassKeyConfig();
              All($body, $passkeys, $config).to(
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
          message: TransportMessage(() =>
            Message<unknown>((transport) => {
              const $body = RequestBody<Record<string, any>>($req);
              const $username = Path($body, Of("username"));
              const $passkey = ConcretePassKey($username);
              const $options = RPC<PassKeyChallenge>(
                Record({
                  transport: Of("cache"),
                  method: Of("get"),
                  params: Record({
                    key: Concatenated([$username, Of("-login")]),
                  }),
                }),
              ).result();
              const $config = PassKeyConfig();
              All($body, $passkey, $options, $config).to(
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
                      NewSid(Of(authId)).result();
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
                                expires: new Date(Date.now() + 3600000),
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
      TransportMessage(() =>
        Of({
          error: "Auth route not found",
          status: 404,
        }),
      ),
    ).to(transport);

    return () => {
      rd.destroy();
    };
  });
}
