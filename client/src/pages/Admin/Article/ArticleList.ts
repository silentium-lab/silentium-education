import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleItem } from "@/pages/Admin/Article/ArticleItem";
import { $title, i18n } from "@/store";
import {
  Any,
  Applied,
  Chain,
  LateShared,
  Local,
  Map,
  Of,
  Shared,
} from "silentium";
import { Path, Template } from "silentium-components";

export function ArticleList() {
  $title.chain(i18n.tr("Articles"));
  const config = ArticleConfig();

  const $reload = LateShared(1);
  const $articlesSearch = LateShared({});
  const $articles = Shared(
    ServerResponse(
      CRUD(Path(config, "model")).list(Chain($reload, $articlesSearch)),
    ),
  );

  return Template(
    (t) => `<div class="article">
      <h1 class="title-1">${t.var(Local($title))}</h1>
      ${t.var(
        Link(
          Applied(config, (c) => `${c.path}/create`),
          i18n.tr("Create article"),
          Of("block mb-3 underline"),
        ),
      )}
      ${t.var(
        Applied(
          Any<any>(
            Chain($articlesSearch, Of([])),
            Map($articles, (article) => ArticleItem(article, $reload)),
          ),
          (a) => a.join(""),
        ),
      )}
    </div>`,
  );
}
