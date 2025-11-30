import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleEdit } from "@/pages/Admin/Article/ArticleEdit";
import { ArticleList } from "@/pages/Admin/Article/ArticleList";
import { ArticleNew } from "@/pages/Admin/Article/ArticleNew";
import { NotFound } from "@/pages/NotFound";
import { $url } from "@/store";
import { All, Applied } from "silentium";
import { Detached, Record, Router } from "silentium-components";

export function ArticleRouter() {
  const $localUrl = Detached($url);
  const config = ArticleConfig();

  return Router(
    $localUrl,
    All(
      Record({
        pattern: Applied(config, (c) => `^${c.path}$`),
        message: ArticleList,
      }),
      Record({
        pattern: Applied(config, (c) => `^${c.path}/create$`),
        message: ArticleNew,
      }),
      Record({
        pattern: Applied(config, (c) => String.raw`^${c.path}/.+/$`),
        message: ArticleEdit,
      }),
    ),
    NotFound,
  );
}
