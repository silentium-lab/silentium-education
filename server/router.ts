import type { IncomingMessage } from "node:http";
import { MessageType, Of, TransportMessage } from "silentium";
import { Detached, Router, Tick } from "silentium-components";
import { Query } from "./src/modules/string/Query";
import { Auth } from "./src/routes/Auth";
import { Configured } from "./src/routes/Configured";
import { Health } from "./src/routes/Health";
import { Private } from "./src/routes/Private";
import { NotFoundSrc } from "./store";
import { AuthGuard } from "./src/guards/AuthGuard";

export const router = (req: MessageType<IncomingMessage>) => {
  const subReq = Detached(req);
  return Tick(
    Router<unknown>(
      Query(req),
      Of([
        {
          pattern: "^GET:/?$",
          message: TransportMessage(Health),
        },
        {
          pattern: "^.+:/auth.+$",
          message: TransportMessage(() => Auth(subReq)),
        },
        {
          pattern: "^GET:/configured$",
          message: TransportMessage(Configured),
        },
        {
          pattern: "^.+:/private.+$",
          message: TransportMessage(() => AuthGuard(subReq, Private(subReq))),
        },
      ]),
      NotFoundSrc,
    ),
  );
};
