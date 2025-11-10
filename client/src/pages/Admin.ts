import { Event, type EventType, Of, TransportEvent } from "silentium";
import { Detached, Router } from "silentium-components";
import { $title, $url } from "@/store";
import { ArticleEdit } from "@/pages/Admin/ArticleEdit";
import { ArticleNew } from "@/pages/Admin/ArticleNew";
import { Articles } from "@/pages/Admin/Articles";
import { Auth } from "@/pages/Admin/Auth";

export function Admin(): EventType<string> {
  return Event((transport) => {
    $title.use("Админ панель");

    const $localUrl = Detached($url);

    const rd = Router(
      $localUrl,
      Of([
        {
          pattern: "^/admin$",
          event: TransportEvent(Auth),
        },
        {
          pattern: "^/admin/articles$",
          name: "list",
          event: TransportEvent(Articles),
        },
        {
          pattern: "^/admin/articles/create$",
          name: "create",
          event: TransportEvent(ArticleNew),
        },
        {
          pattern: String.raw`^/admin/articles/.+/$`,
          name: "edit",
          event: TransportEvent(ArticleEdit),
        },
      ]),
      TransportEvent(() => Of("Admin not found")),
    ).event(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
