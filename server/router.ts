import type { IncomingMessage } from "node:http";
import { EventType, Of } from "silentium";
import { Detached, Router, Tick } from "silentium-components";
import { Query } from "./src/modules/string/Query";
import { Auth } from "./src/routes/Auth";
import { Configured } from "./src/routes/Configured";
import { Health } from "./src/routes/Health";
import { Private } from "./src/routes/Private";
import { NotFoundSrc } from "./store";

export const router = (req: EventType<IncomingMessage>) => {
  const subReq = Detached(req);
  return Tick(
    Router(
      Query(req),
      Of([
        {
          pattern: "^GET:/?$",
          template: Health,
        },
        {
          pattern: "^GET:/auth$",
          template: Auth,
        },
        {
          pattern: "^GET:/configured$",
          template: Configured,
        },
        {
          pattern: "^.+:/private.+$",
          template: () => Private(subReq),
        },
      ]),
      NotFoundSrc,
    ),
  );
};
