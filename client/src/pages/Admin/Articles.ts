import { any, applied, chain, DataType, lateShared, map, of, once } from "silentium";
import { constant, path, recordOf, shot, template } from "silentium-components";
import { backendCrudSrc, notificationSrc } from "../../bootstrap";
import { clickedId } from "../../modules/ClickedId";
import { mustache } from "../../modules/plugins/mustache/Mustache";
import { i18n, titleSrc } from "../../store";

export const articles = (): DataType<string> => {
  return (user) => {
    const title = i18n.tr("Articles")
    title(titleSrc.give);

    const articlesSearchSrc = lateShared({});
    const articlesSrc = backendCrudSrc.ofModelName(of('articles')).list(articlesSearchSrc.value);

    const t = template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        <a href="/admin/articles/create" class="block mb-3 underline">
          Создать статью
        </a>
        ${t.var(applied(
      any<any>(chain(articlesSearchSrc.value, of([])), map(
        articlesSrc,
        (article) => {
          const removeTrigger = lateShared();
          const removedSrc = backendCrudSrc.ofModelName(of('articles')).deleted(
            shot(path(article, of('_id')), removeTrigger.value)
          );
          constant({}, once(removedSrc))(articlesSearchSrc.give);

          constant({
            type: 'success',
            content: 'Успешно удалено'
          } as const, removedSrc)(notificationSrc.give);

          return mustache(of(`<div class="flex gap-2">
                <a href="/admin/articles/{{ article._id }}/" class="underline">
                  {{ article.title }}
                </a>
                <div class="cursor-pointer {{ removeId }}">&times;</div>
              </div>`), recordOf({
            article,
            removeId: clickedId(removeTrigger),
          }))
        }
      )),
      (a) => a.join('')
    ))}
      </div>`);
      t.value(user);
  }
}
