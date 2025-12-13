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
import { All, Context, Message, MessageType, Of, Void } from "silentium";
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
  ) as MessageType<Passkey>;
}

function UpdateCounter(
  $passkey: MessageType<Passkey>,
  $counter: MessageType<number>,
) {
  return Path(
    Context<object>(
      Record({
        transport: "db",
        params: Record({
          method: "updateOne",
          collection: "user-passkeys",
          args: All(
            Record({
              _id: Path($passkey, "_id"),
            }),
            Record({
              $set: Record({
                counter: $counter,
              }),
            }),
          ),
        }),
      }),
    ),
    "data",
  );
}

function NewPassKey($form: MessageType) {
  return Path<object>(
    Context(
      Record({
        transport: "db",
        params: Record({
          method: "insertOne",
          collection: "user-passkeys",
          args: All($form),
        }),
      }),
    ),
    "data",
  );
}

function PassKeyConfig() {
  return Context<PassKeyConfigType>({
    transport: "config",
    params: { method: "get" },
  });
}

export function Auth($req: MessageType<IncomingMessage>) {
  return Message((transport) => {
    const $config = Context<PassKeyConfigType>({
      transport: "config",
      params: {
        method: "get",
      },
    });

    const rd = Router<any>(
      Query($req),
      Of([
        {
          pattern: "^POST:/auth/registration/start$",
          message: () =>
            Message<unknown>((transport) => {
              const $body = RequestBody($req);
              const $passkeys = UserPasskeys(Path($body, Of("username")));
              All($config, $body, $passkeys).then(
                async ([config, body, passkeys]) => {
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
                  Context({
                    transport: "cache",
                    params: {
                      method: "put",
                      key: username,
                      value: options,
                    },
                  }).then(Void());
                  transport({
                    data: options,
                  });
                },
              );
            }),
        },
        {
          pattern: "^POST:/auth/registration/finish$",
          message: () =>
            Message<unknown>((resolve) => {
              const $config = Context<PassKeyConfigType>({
                transport: "config",
                method: "get",
              });
              const $body = RequestBody<Record<string, any>>($req);
              const $options = Context<PassKeyChallenge>(
                Record({
                  transport: "cache",
                  params: Record({
                    method: "get",
                    key: Path($body, "username"),
                  }),
                }),
              );
              All($body, $options, $config).then(
                async ([data, options, config]) => {
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
                      ).then(Void());
                      resolve({
                        data: {
                          result: true,
                        },
                      });
                      return;
                    }
                  } catch (error) {
                    resolve({
                      status: 400,
                      error: error.message,
                    });
                    return;
                  }
                  resolve({
                    status: 500,
                    error: "Unable to register",
                  });
                },
              );
            }),
        },
        {
          pattern: "^POST:/auth/login/start$",
          message: () =>
            Message<unknown>((resolve) => {
              const $body = RequestBody<Record<string, any>>($req);
              const $passkeys = UserPasskeys(Path($body, Of("username")));
              const $config = PassKeyConfig();
              All($body, $passkeys, $config).then(
                async ([body, passkeys, config]) => {
                  const options: PublicKeyCredentialRequestOptionsJSON =
                    await generateAuthenticationOptions({
                      rpID: config.rpID,
                      allowCredentials: passkeys.map((passkey) => ({
                        id: passkey.id,
                        transports: passkey.transports,
                      })),
                    });
                  Context(
                    Of({
                      transport: "cache",
                      params: {
                        method: "put",
                        key: `${body.username}-login`,
                        value: options,
                      },
                    }),
                  ).then(Void());
                  resolve({
                    data: options,
                  });
                },
              );
            }),
        },
        {
          pattern: "^POST:/auth/login/finish$",
          message: () =>
            Message<unknown>((transport) => {
              const $body = RequestBody<Record<string, any>>($req);
              const $username = Path<string>($body, "username");
              const $passkey = ConcretePassKey($username);
              const $options = Context<PassKeyChallenge>(
                Record({
                  transport: "cache",
                  params: Record({
                    method: "get",
                    key: Concatenated([$username, Of("-login")]),
                  }),
                }),
              );
              const $config = PassKeyConfig();
              All($body, $passkey, $options, $config).then(
                async ([body, passkey, options, config]) => {
                  if (!passkey) {
                    transport({
                      status: 400,
                      error: "Auth not found",
                    });
                    return;
                  }
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
                      UpdateCounter(Of(passkey), Of(newCounter)).then(Void());
                      authId = uuidv4();
                      NewSid(Of(authId)).then(Void());
                    }

                    transport({
                      data: { verified },
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
                    transport({
                      status: 400,
                      error: error.message,
                    });
                    return;
                  }
                },
              );
            }),
        },
      ]),
      () =>
        Of({
          error: "Auth route not found",
          status: 404,
        }),
    );
    rd.then(transport);

    return () => {
      rd.destroy();
    };
  });
}
