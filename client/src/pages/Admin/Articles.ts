import { any, applied, chain, constructorDestroyable, destroyContainer, destructor, EventType, lateShared, map, of, once, shared } from "silentium";
import { constant, detached, path, recordOf, shot, template } from "silentium-components";
import { backendCrudSrc, backendTransport, notificationSrc } from "../../bootstrap";
import { link } from "../../components/Link";
import { clickedId } from "../../modules/ClickedId";
import { i18n, titleSrc } from "../../store";
import { ArticleType } from "../../types/ArticleType";

export const articles = (): EventType<string> => {
  return (user) => {
    const title = i18n.tr("Articles")
    title(titleSrc.use);

    const transport = constructorDestroyable(backendTransport);

    const articlesSearchSrc = lateShared({});
    const articlesSrc = shared(backendCrudSrc.ofModelName(of('articles')).list(
      transport.get,
      articlesSearchSrc.event
    ));

    const dc = destroyContainer();

    const t = template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        ${t.var(link(of('/admin/articles/create'), of('Создать статью'), of('block mb-3 underline')))}
        ${t.var(applied(
      any<any>(chain(articlesSearchSrc.event, of([])), map(
        articlesSrc.event,
        (article) => {
          const removeTrigger = lateShared();
          removeTrigger.event(console.log);
          const localArticle = detached<ArticleType>(article);
          const removedSrc = shared(dc.add(backendCrudSrc.ofModelName(of('articles')).deleted(
            transport.get,
            shot(once(path(localArticle, of('_id'))), once(removeTrigger.event))
          )));
          constant({}, once(removedSrc.event))(articlesSearchSrc.use);

          constant({
            type: 'success',
            content: 'Успешно удалено'
          } as const, removedSrc.event)(notificationSrc.use);

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
              $removeId: dc.add(clickedId(removeTrigger)),
          })).value
        }
      )),
      (a) => a.join('')
    ))}
      </div>`);
      t.value(user);

      return () => {
        dc.destroy();
        articlesSrc.destroy();
        transport.destroy();
        t.destroy();
      }
  }
}
