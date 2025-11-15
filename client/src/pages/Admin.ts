import { ArticleEdit } from "@/pages/Admin/ArticleEdit";
import { ArticleNew } from "@/pages/Admin/ArticleNew";
import { Articles } from "@/pages/Admin/Articles";
import { Auth } from "@/pages/Admin/Auth";
import { $title, $url } from "@/store";
import { Message, Of, TransportMessage } from "silentium";
import { Detached, Router } from "silentium-components";

export function Admin() {
  return Message<string>((transport) => {
    $title.use("Админ панель");

    const $localUrl = Detached($url);

    const rd = Router(
      $localUrl,
      Of([
        {
          pattern: "^/admin$",
          message: TransportMessage(Auth),
        },
        {
          pattern: "^/admin/articles$",
          name: "list",
          message: TransportMessage(Articles),
        },
        {
          pattern: "^/admin/articles/create$",
          name: "create",
          message: TransportMessage(ArticleNew),
        },
        {
          pattern: String.raw`^/admin/articles/.+/$`,
          name: "edit",
          message: TransportMessage(ArticleEdit),
        },
      ]),
      TransportMessage(() => Of("Admin not found")),
    ).to(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
