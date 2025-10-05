import { any, applied, chain, DataType, lateShared, map, of, once } from "silentium";
import { constant, path, recordOf, shot, template } from "silentium-components";
import { backendCrudSrc, notificationSrc } from "../../bootstrap";
import { link } from "../../components/Link";
import { clickedId } from "../../modules/ClickedId";
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
        ${t.var(link(of('/admin/articles/create'), of('Создать статью'), of('block mb-3 underline')))}
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

          return template(of(`<div class="flex gap-2">
                $link
                <div class="cursor-pointer $removeId">&times;</div>
              </div>`),
            recordOf({
              $link: link(
                template(of('/admin/articles/$id/'), recordOf({ $id: path(article, of('_id')) })).value,
                path(article, of('title')),
                of('underline')
              ),
              $removeId: clickedId(removeTrigger),
          })).value
        }
      )),
      (a) => a.join('')
    ))}
      </div>`);
      t.value(user);

      return () => {
        t.destroy();
      }
  }
}
