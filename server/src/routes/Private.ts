import { IncomingMessage } from "http";
import { Message, MessageType, Of } from "silentium";
import { Router } from "silentium-components";
import { CRUDRouter } from "../app/CRUDRouter";
import { Query } from "../modules/string/Query";
import { Logout } from "./Logout";

export function Private(req: MessageType<IncomingMessage>) {
  return Message((transport) => {
    const rd = Router(
      Query(req),
      Of([
        {
          pattern: "^.+:/private/logout.*$",
          message: Logout,
        },
        {
          pattern: "^.+:/private/articles.*$",
          message: () => CRUDRouter(req, "/private/articles", "documents"),
        },
        {
          pattern: "^.+:/private/categories.*$",
          message: () => CRUDRouter(req, "/private/categories", "categories"),
        },
        {
          pattern: "^.+:/private/settings.*$",
          message: () => CRUDRouter(req, "/private/settings", "settings"),
        },
      ]),
      () => Of("Private not found"),
    );
    rd.then(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
