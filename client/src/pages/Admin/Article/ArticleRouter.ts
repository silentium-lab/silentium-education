import { ArticleEdit } from "@/pages/Admin/Article/ArticleEdit";
import { ArticleList } from "@/pages/Admin/Article/ArticleList";
import { ArticleNew } from "@/pages/Admin/Article/ArticleNew";
import { NotFound } from "@/pages/NotFound";
import { $url } from "@/store";
import { Detached, Router } from "silentium-components";

export function ArticleRouter() {
  const $localUrl = Detached($url);

  return Router(
    $localUrl,
    [
      {
        pattern: "^/admin/articles$",
        message: ArticleList,
      },
      {
        pattern: "^/admin/articles/create$",
        message: ArticleNew,
      },
      {
        pattern: String.raw`^/admin/articles/.+/$`,
        message: ArticleEdit,
      },
    ],
    NotFound,
  );
}
