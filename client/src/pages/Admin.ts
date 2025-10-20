import { type EventType, Of } from "silentium";
import { Detached, Router } from "silentium-components";
import { titleSrc, urlSrc } from "../store";
import { ArticleEdit } from "./Admin/ArticleEdit";
import { ArticleNew } from "./Admin/ArticleNew";
import { Articles } from "./Admin/Articles";
import { Auth } from "./Admin/Auth";

export function Admin(): EventType<string> {
  return function AdminEvent(user) {
    titleSrc.use("Админ панель");

    const localUrlSrc = Detached(urlSrc.event);

    const rd = Router(
      localUrlSrc,
      Of([
        {
          pattern: "^/admin$",
          template: Auth,
        },
        {
          pattern: "^/admin/articles$",
          name: "list",
          template: Articles,
        },
        {
          pattern: "^/admin/articles/create$",
          name: "create",
          template: ArticleNew,
        },
        {
          pattern: String.raw`^/admin/articles/.+/$`,
          name: "edit",
          template: ArticleEdit,
        },
      ]),
      () => Of("Admin not found"),
    )(user);

    return function AdminDestroy() {
      rd?.();
    };
  };
}
