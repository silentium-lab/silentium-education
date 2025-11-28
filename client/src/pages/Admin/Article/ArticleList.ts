import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { ArticleItem } from "@/pages/Admin/Article/ArticleItem";
import { $title, i18n } from "@/store";
import {
  Any,
  Applied,
  Chain,
  LateShared,
  Local,
  Map,
  Message,
  MessageType,
  Of,
  Shared,
} from "silentium";
import { Template } from "silentium-components";

export function ArticleList() {
  return Message<string>((transport) => {
    $title.chain(i18n.tr("Articles"));

    const $reload = LateShared(1);
    const $articlesSearch = LateShared({});
    const $articles = Shared(
      ServerResponse(
        CRUD("private/articles").list(Chain($reload, $articlesSearch)),
      ) as MessageType<any[]>,
    );

    const t = Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(Local($title))}</h1>
        ${t.var(Link(Of("/admin/articles/create"), Of("Создать статью"), Of("block mb-3 underline")))}
        ${t.var(
          Applied(
            Any<any>(
              Chain($articlesSearch, Of([])),
              Map($articles, (article) => {
                return ArticleItem(article, $reload);
              }),
            ),
            (a) => a.join(""),
          ),
        )}
      </div>`);
    t.then(transport);

    return () => {
      $articles.destroy();
      t.destroy();
    };
  });
}
