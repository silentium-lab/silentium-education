import type { IncomingMessage } from "node:http";
import { MessageType, Of } from "silentium";
import { Deadline, Detached, Router } from "silentium-components";
import { AuthGuard } from "./src/guards/AuthGuard";
import { Query } from "./src/modules/string/Query";
import { Auth } from "./src/routes/Auth";
import { Configured } from "./src/routes/Configured";
import { Health } from "./src/routes/Health";
import { Private } from "./src/routes/Private";
import { NotFoundSrc } from "./store";

export const router = (req: MessageType<IncomingMessage>) => {
  const subReq = Detached(req);
  return Deadline(
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
          message: () => AuthGuard(subReq, Private),
        },
      ]),
      NotFoundSrc,
    ),
    10_000,
  );
};
