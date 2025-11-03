import { IncomingMessage } from "http";
import { Event, EventType, Of, TransportEvent } from "silentium";
import { Router } from "silentium-components";
import { Query } from "../modules/string/Query";
import { CRUDRouter } from "../app/CRUDRouter";
import { mongoTransport } from "../../bootstrap";

export function Private(req: EventType<IncomingMessage>): EventType<string> {
  return Event((user) => {
    const rd = Router(
      Query(req),
      Of([
        {
          pattern: "^.+:/private/articles.*$",
          event: TransportEvent(() =>
            CRUDRouter(req, mongoTransport, "/private/articles", "documents"),
          ),
        },
        {
          pattern: "^.+:/private/categories.*$",
          event: TransportEvent(() =>
            CRUDRouter(
              req,
              mongoTransport,
              "/private/categories",
              "categories",
            ),
          ),
        },
        {
          pattern: "^.+:/private/settings.*$",
          event: TransportEvent(() =>
            CRUDRouter(req, mongoTransport, "/private/settings", "settings"),
          ),
        },
      ]),
      TransportEvent(() => Of("Private not found")),
    ).event(user);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
