import { IncomingMessage } from "http";
import { Context, Message, Of } from "silentium";
import { Router } from "silentium-components";
import { NotFoundSrc } from "../../store";
import { CRUDRouter } from "../app/CRUDRouter";
import { Query } from "../modules/string/Query";
import { Logout } from "./Logout";

export function Private() {
  const $req = Context<IncomingMessage>("request");
  return Message((transport) => {
    const rd = Router(
      Query($req),
      [
        {
          pattern: "^.+:/private/logout.*$",
          message: Logout,
        },
        {
          pattern: "^.+:/private/auth$",
          message: () =>
            Of({
              auth: true,
            }),
        },
        {
          pattern: "^.+:/private/articles.*$",
          message: () => CRUDRouter("/private/articles", "documents"),
        },
        {
          pattern: "^.+:/private/categories.*$",
          message: () => CRUDRouter("/private/categories", "categories"),
        },
        {
          pattern: "^.+:/private/sections.*$",
          message: () => CRUDRouter("/private/sections", "sections"),
        },
        {
          pattern: "^.+:/private/settings.*$",
          message: () => CRUDRouter("/private/settings", "settings"),
        },
      ],
      NotFoundSrc,
    );
    rd.then(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
