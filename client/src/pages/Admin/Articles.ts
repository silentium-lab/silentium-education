import { Applied, From, InformationType, Lazy, Map, type OwnerType, TheInformation } from "silentium";
import { Concatenated, RecordOf, Template, ToJson } from "silentium-components";
import { backendCrudSrc } from "../../bootstrap";
import { Link } from "../../components/Link";
import { i18n, titleSrc } from "../../store";
import { Mustache } from "../../modules/plugins/mustache/Mustache";

export class Articles extends TheInformation {
  value(o: OwnerType<unknown>): this {
    const title = i18n.tr("Articles").value(titleSrc);

    const articlesSrc = backendCrudSrc.ofModelName('articles').list();
    articlesSrc.value(new From(console.log));

    const t = new Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        ${t.var(new Applied(
          new Map(articlesSrc, new Lazy((article) => new Mustache(`<div>Article {{ article.slug }}</div>`, new RecordOf({ article })))),
          (a) => a.join('')
        ))}
        <div>
          ${t.var(new Link("/admin/articles/1", i18n.tr("Article 1"), "underline"))}
        </div>
      </div>`).value(o);

    return this;
  }
}
