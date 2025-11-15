import { IncomingMessage } from "http";
import { Message, MessageType, Of, TransportMessage } from "silentium";
import { Router } from "silentium-components";
import { CRUDRouter } from "../app/CRUDRouter";
import { Query } from "../modules/string/Query";

export function Private(req: MessageType<IncomingMessage>) {
  return Message((transport) => {
    const rd = Router(
      Query(req),
      Of([
        {
          pattern: "^.+:/private/articles.*$",
          message: TransportMessage(() =>
            CRUDRouter(req, "/private/articles", "documents"),
          ),
        },
        {
          pattern: "^.+:/private/categories.*$",
          message: TransportMessage(() =>
            CRUDRouter(req, "/private/categories", "categories"),
          ),
        },
        {
          pattern: "^.+:/private/settings.*$",
          message: TransportMessage(() =>
            CRUDRouter(req, "/private/settings", "settings"),
          ),
        },
      ]),
      TransportMessage(() => Of("Private not found")),
    ).to(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
