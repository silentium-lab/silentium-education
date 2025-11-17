import { IncomingMessage } from "http";
import { Message, MessageType, Of, TapMessage } from "silentium";
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
          message: TapMessage(() =>
            CRUDRouter(req, "/private/articles", "documents"),
          ),
        },
        {
          pattern: "^.+:/private/categories.*$",
          message: TapMessage(() =>
            CRUDRouter(req, "/private/categories", "categories"),
          ),
        },
        {
          pattern: "^.+:/private/settings.*$",
          message: TapMessage(() =>
            CRUDRouter(req, "/private/settings", "settings"),
          ),
        },
      ]),
      TapMessage(() => Of("Private not found")),
    ).pipe(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
