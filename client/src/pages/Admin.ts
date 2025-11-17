import { Context } from "@/modules/context/Context";
import { ArticleEdit } from "@/pages/Admin/ArticleEdit";
import { ArticleNew } from "@/pages/Admin/ArticleNew";
import { Articles } from "@/pages/Admin/Articles";
import { Auth } from "@/pages/Admin/Auth";
import { $title, $url } from "@/store";
import { Filtered, Message, Of, TapMessage } from "silentium";
import { Detached, Router, Shot } from "silentium-components";

export function Admin() {
  return Message<string>((transport) => {
    $title.use("Админ панель");

    const $localUrl = Detached($url);
    const $error = Filtered(Context("error"), (e: any) => e.status === 401);

    Shot(Auth(), $error).pipe(transport);

    const rd = Router(
      $localUrl,
      Of([
        {
          pattern: "^/admin$",
          message: TapMessage(Auth),
        },
        {
          pattern: "^/admin/articles$",
          name: "list",
          message: TapMessage(Articles),
        },
        {
          pattern: "^/admin/articles/create$",
          name: "create",
          message: TapMessage(ArticleNew),
        },
        {
          pattern: String.raw`^/admin/articles/.+/$`,
          name: "edit",
          message: TapMessage(ArticleEdit),
        },
      ]),
      TapMessage(() => Of("Admin not found")),
    ).pipe(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
