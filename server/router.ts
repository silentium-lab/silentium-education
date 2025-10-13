import type { IncomingMessage } from "node:http";
import { EventType, of } from "silentium";
import { router as Router, tick } from "silentium-components";
import { mongoTransport } from "./bootstrap";
import { CRUDRouter } from "./src/app/CRUDRouter";
import { query } from "./src/modules/string/Query";
import { auth } from "./src/routes/Auth";
import { health } from "./src/routes/Health";
import { settings } from "./src/routes/Settings";
import { notFoundSrc } from "./store";

export const router = (req: EventType<IncomingMessage>) => {
  return tick(
    Router(
      query(req),
      of([
        {
          pattern: "^GET:/?$",
          template: health,
        },
        {
          pattern: "^GET:/auth$",
          template: auth,
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
      notFoundSrc,
    ),
  );
};
