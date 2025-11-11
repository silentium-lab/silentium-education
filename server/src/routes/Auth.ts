import { IncomingMessage } from "http";
import {
  All,
  Event,
  EventType,
  Of,
  RPC,
  Transport,
  TransportEvent,
} from "silentium";
import { Router } from "silentium-components";
import { Query } from "../modules/string/Query";
import getRawBody from "raw-body";
import {
  verifyRegistrationResponse,
  verifyAuthenticationResponse,
  generateRegistrationOptions,
} from "@simplewebauthn/server";
import { PassKeyConfigType } from "../types/PassKeyConfigType";

const users: any = {};
const challenges: any = {};
const rpId = "localhost";
const expectedOrigin = ["http://localhost:1234"];

export function Auth($req: EventType<IncomingMessage>): EventType {
  return Event((transport) => {
    const rd = Router(
      Query($req),
      Of([
        {
          pattern: "^POST:/auth/registration/start$",
          event: TransportEvent(() =>
            Event<unknown>((transport) => {
              const $config = RPC<PassKeyConfigType>(
                Of({ transport: "config", method: "get" }),
              ).result();
              All($req, $config).event(
                Transport(async ([req, config]) => {
                  const body = await getRawBody(req);
                  const bodyText = body.toString("utf8");
                  const { username } = JSON.parse(bodyText);
                  const options: PublicKeyCredentialCreationOptionsJSON =
                    await generateRegistrationOptions({
                      rpName: config.rpName,
                      rpID: config.rpID,
                      userName: username,
                      attestationType: "none",
                      authenticatorSelection: {
                        residentKey: "preferred",
                        userVerification: "preferred",
                        authenticatorAttachment: "platform",
                      },
                    });
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
              $req.event(
                Transport(async (req) => {
                  const body = await getRawBody(req);
                  const bodyText = body.toString("utf8");
                  const data = JSON.parse(bodyText);
                  // Verify the attestation response
                  let verification;
                  try {
                    verification = await verifyRegistrationResponse({
                      response: data,
                      expectedChallenge: challenges[data.username],
                      expectedOrigin: expectedOrigin,
                    });
                    const { verified, registrationInfo } = verification;
                    if (verified) {
                      users[data.username] = registrationInfo;
                      transport.use({
                        result: true,
                      });
                    }
                  } catch (error) {
                    console.error(error);
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
              $req.event(
                Transport(async (req) => {
                  const body = await getRawBody(req);
                  const bodyText = body.toString("utf8");
                  const { username } = JSON.parse(bodyText);
                  if (!users[username]) {
                    transport.use({
                      status: 404,
                      error: "Not found",
                    });
                    return;
                  }
                  const challenge = getNewChallenge();
                  challenges[username] = convertChallenge(challenge);
                  transport.use({
                    data: {
                      challenge,
                      rpId,
                      allowCredentials: [
                        {
                          type: "public-key",
                          id: users[username].credentialID,
                          transports: ["internal"],
                        },
                      ],
                      userVerification: "preferred",
                    },
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
              $req.event(
                Transport(async (req) => {
                  const body = await getRawBody(req);
                  const bodyText = body.toString("utf8");
                  const { username } = JSON.parse(bodyText);
                  const data = JSON.parse(bodyText);
                  if (!users[username]) {
                    transport.use({
                      status: 404,
                      error: "Not found",
                    });
                    return;
                  }
                  let verification;
                  try {
                    const user = users[username];
                    verification = await verifyAuthenticationResponse({
                      expectedChallenge: challenges[username],
                      response: data,
                      credential: user,
                      expectedRPID: rpId,
                      expectedOrigin,
                      requireUserVerification: false,
                    });
                  } catch (error) {
                    console.error(error);
                    transport.use({
                      status: 400,
                      error: error.message,
                    });
                    return;
                  }
                  const { verified } = verification;
                  transport.use({
                    res: verified,
                  });
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

function getNewChallenge() {
  return Math.random().toString(36).substring(2);
}
function convertChallenge(challenge: string) {
  return btoa(challenge).replaceAll("=", "");
}
