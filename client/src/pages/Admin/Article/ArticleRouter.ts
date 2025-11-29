import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleEdit } from "@/pages/Admin/Article/ArticleEdit";
import { ArticleList } from "@/pages/Admin/Article/ArticleList";
import { ArticleNew } from "@/pages/Admin/Article/ArticleNew";
import { NotFound } from "@/pages/NotFound";
import { $url } from "@/store";
import { Detached, Router } from "silentium-components";

export function ArticleRouter() {
  const $localUrl = Detached($url);
  const config = ArticleConfig();

  return Router(
    $localUrl,
    [
      {
        pattern: `^${config.path}$`,
        message: ArticleList,
      },
      {
        pattern: `^${config.path}/create$`,
        message: ArticleNew,
      },
      {
        pattern: String.raw`^${config.path}/.+/$`,
        message: ArticleEdit,
      },
    ],
    NotFound,
  );
}
