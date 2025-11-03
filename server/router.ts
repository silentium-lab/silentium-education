import type { IncomingMessage } from "node:http";
import { EventType, Of, TransportEvent } from "silentium";
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
          event: TransportEvent(Health),
        },
        {
          pattern: "^GET:/auth$",
          event: TransportEvent(Auth),
        },
        {
          pattern: "^GET:/configured$",
          event: TransportEvent(Configured),
        },
        {
          pattern: "^.+:/private.+$",
          event: TransportEvent(() => Private(subReq)),
        },
      ]),
      NotFoundSrc,
    ),
  );
};
