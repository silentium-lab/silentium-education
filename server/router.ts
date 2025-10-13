import type { IncomingMessage } from "node:http";
import { EventType, Of } from "silentium";
import { Router, Tick } from "silentium-components";
import { mongoTransport } from "./bootstrap";
import { CRUDRouter } from "./src/app/CRUDRouter";
import { Query } from "./src/modules/string/Query";
import { Auth } from "./src/routes/Auth";
import { Health } from "./src/routes/Health";
import { NotFoundSrc } from "./store";

export const router = (req: EventType<IncomingMessage>) => {
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
          pattern: "^.+:/articles.*$",
          template: () => CRUDRouter(req, mongoTransport, '/articles', 'documents'),
        },
        {
          pattern: "^.+:/categories.*$",
          template: () => CRUDRouter(req, mongoTransport, '/categories', 'categories'),
        },
        {
          pattern: "^.+:/settings.*$",
          template: () => CRUDRouter(req, mongoTransport, '/settings', 'settings'),
        },
      ]),
      NotFoundSrc,
    ),
  );
};
