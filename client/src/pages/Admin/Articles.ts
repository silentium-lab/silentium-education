import { Applied, Lazy, Map, type OwnerType, TheInformation } from "silentium";
import { RecordOf, Template } from "silentium-components";
import { backendCrudSrc } from "../../bootstrap";
import { Mustache } from "../../modules/plugins/mustache/Mustache";
import { i18n, titleSrc } from "../../store";

export class Articles extends TheInformation {
  value(o: OwnerType<unknown>): this {
    const title = i18n.tr("Articles").value(titleSrc);

    const articlesSrc = backendCrudSrc.ofModelName('articles').list();

    const t = new Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        ${t.var(new Applied(
          new Map(articlesSrc, new Lazy(
            (article) => new Mustache(`<div>
                <a href="/admin/articles/{{ article._id }}/" class="underline">
                  {{ article.title }}
                </a>
              </div>`, new RecordOf({
                article,
              }))
          )),
          (a) => a.join('')
        ))}
      </div>`).value(o);

    return this;
  }
}
