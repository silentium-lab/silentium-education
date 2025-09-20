import { Any, Applied, Chain, From, Late, Lazy, Map, Of, Once, type OwnerType, Shared, SharedSource, TheInformation } from "silentium";
import { Const, Path, RecordOf, Shot, Template } from "silentium-components";
import { backendCrudSrc, notificationSrc } from "../../bootstrap";
import { Mustache } from "../../modules/plugins/mustache/Mustache";
import { i18n, titleSrc } from "../../store";
import { ClickedId } from "../../modules/ClickedId";

export class Articles extends TheInformation {
  value(o: OwnerType<unknown>): this {
    const title = i18n.tr("Articles").value(titleSrc);

    const articlesSearchSrc = new SharedSource(new Late({}));
    const articlesSrc = backendCrudSrc.ofModelName('articles').list(articlesSearchSrc);

    const t = new Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        <a href="/admin/articles-new/" class="block mb-3 underline">
          Создать статью
        </a>
        ${t.var(new Applied(
      new Any<any>(new Chain(articlesSearchSrc, new Of([])), new Map(articlesSrc, new Lazy(
        (article) => {
          const removeTrigger = new Shared(new Late());
          const removedSrc = backendCrudSrc.ofModelName('articles').deleted(
            new Shot(new Path(article, new Of('_id')), removeTrigger)
          );
          new Const({}, new Once(removedSrc)).value(articlesSearchSrc);

          new Const({
            type: 'success',
            content: 'Успешно удалено'
          }, removedSrc).value(notificationSrc);

          return new Mustache(`<div class="flex gap-2">
                <a href="/admin/articles/{{ article._id }}/" class="underline">
                  {{ article.title }}
                </a>
                <div class="cursor-pointer {{ removeId }}">&times;</div>
              </div>`, new RecordOf({
            article,
            removeId: new ClickedId(removeTrigger),
          })).addDep(removeTrigger).addDep(removedSrc)
        }
      ))),
      (a) => a.join('')
    ))}
      </div>`).value(o);

    return this;
  }
}
