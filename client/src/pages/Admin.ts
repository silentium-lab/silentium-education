import { FromContext } from "@/modules/context/Context";
import { ArticleEdit } from "@/pages/Admin/ArticleEdit";
import { ArticleNew } from "@/pages/Admin/ArticleNew";
import { Articles } from "@/pages/Admin/Articles";
import { Auth } from "@/pages/Admin/Auth";
import { $title, $url } from "@/store";
import { Filtered, Message, Of } from "silentium";
import { Detached, Router, Shot } from "silentium-components";

export function Admin() {
  return Message<string>((transport) => {
    $title.use("Админ панель");

    const $localUrl = Detached($url);
    const $error = Filtered(FromContext("error"), (e: any) => e.status === 401);

    Shot<string>(Auth(), $error).then(transport);

    const rd = Router(
      $localUrl,
      Of([
        {
          pattern: "^/admin$",
          message: Auth,
        },
        {
          pattern: "^/admin/articles$",
          name: "list",
          message: Articles,
        },
        {
          pattern: "^/admin/articles/create$",
          name: "create",
          message: ArticleNew,
        },
        {
          pattern: String.raw`^/admin/articles/.+/$`,
          name: "edit",
          message: ArticleEdit,
        },
      ]),
      () => Of("Admin not found"),
    );
    rd.then(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
