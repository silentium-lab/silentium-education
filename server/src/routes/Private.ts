import { IncomingMessage } from "http";
import { EventType, Of } from "silentium";
import { Router } from "silentium-components";
import { Query } from "../modules/string/Query";
import { CRUDRouter } from "../app/CRUDRouter";
import { mongoTransport } from "../../bootstrap";

export function Private(req: EventType<IncomingMessage>): EventType<string> {
  return (user) => {
    const rd = Router(
      Query(req),
      Of([
        {
          pattern: "^.+:/private/articles.*$",
          template: () =>
            CRUDRouter(req, mongoTransport, "/private/articles", "documents"),
        },
        {
          pattern: "^.+:/private/categories.*$",
          template: () =>
            CRUDRouter(
              req,
              mongoTransport,
              "/private/categories",
              "categories",
            ),
        },
        {
          pattern: "^.+:/private/settings.*$",
          template: () =>
            CRUDRouter(req, mongoTransport, "/private/settings", "settings"),
        },
      ]),
      () => Of("Private not found"),
    )(user);

    return function AdminDestroy() {
      rd?.();
    };
  };
}
