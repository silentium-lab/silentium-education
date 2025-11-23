import type { IncomingMessage } from "node:http";
import { MessageType, Of } from "silentium";
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
  return Tick<any>(
    Router(
      Query(req),
      Of([
        {
          pattern: "^GET:/?$",
          message: Health,
        },
        {
          pattern: "^.+:/auth.+$",
          message: () => Auth(subReq),
        },
        {
          pattern: "^GET:/configured$",
          message: Configured,
        },
        {
          pattern: "^.+:/private.+$",
          message: () => AuthGuard(subReq, Private(subReq)),
        },
      ]),
      NotFoundSrc,
    ),
  );
};
