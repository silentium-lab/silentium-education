import {
  Any,
  Applied,
  Chain,
  DestroyContainer,
  Event,
  LateShared,
  Map,
  Of,
  Once,
  Shared,
  Transport,
  TransportDestroyable,
  TransportEvent,
  type EventType,
} from "silentium";
import {
  Constant,
  Detached,
  Path,
  RecordOf,
  Shot,
  Template,
} from "silentium-components";
import {
  backendCrudSrc,
  backendTransport,
  notificationSrc,
} from "../../bootstrap";
import { Link } from "../../components/Link";
import { ClickedId } from "../../modules/ClickedId";
import { i18n, titleSrc } from "../../store";
import type { ArticleType } from "../../types/ArticleType";

export function Articles(): EventType<string> {
  return Event((transport) => {
    const title = i18n.tr("Articles");
    title.event(titleSrc);

    const backendTransportInstance = TransportDestroyable(backendTransport);

    const articlesSearchSrc = LateShared({});
    const articlesSrc = Shared(
      backendCrudSrc
        .ofModelName(Of("private/articles"))
        .list(backendTransportInstance, articlesSearchSrc),
    );

    const dc = DestroyContainer();

    const t = Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        ${t.var(Link(Of("/admin/articles/create"), Of("Создать статью"), Of("block mb-3 underline")))}
        ${t.var(
          Applied(
            Any<any>(
              Chain(articlesSearchSrc, Of([])),
              Map(
                articlesSrc,
                TransportEvent((article) => {
                  const removeTrigger = LateShared();
                  removeTrigger.event(Transport(console.log));
                  const localArticle = Detached<ArticleType>(article);
                  const removedSrc = Shared(
                    backendCrudSrc
                      .ofModelName(Of("private/articles"))
                      .deleted(
                        backendTransportInstance,
                        Shot(
                          Once(Path(localArticle, Of("_id"))),
                          Once(removeTrigger),
                        ),
                      ),
                  );
                  Constant({}, Once(removedSrc)).event(articlesSearchSrc);

                  Constant(
                    {
                      type: "success",
                      content: "Успешно удалено",
                    } as const,
                    removedSrc,
                  ).event(notificationSrc);

                  return Template(
                    Of(`<div class="flex gap-2">
                      $link
                      <div class="cursor-pointer $removeId">&times;</div>
                    </div>`),
                    RecordOf({
                      $link: Link(
                        Template(
                          Of("/admin/articles/$id/"),
                          RecordOf({ $id: Path(article, Of("_id")) }),
                        ),
                        Path(article, Of("title")),
                        Of("underline"),
                      ),
                      $removeId: dc.add(ClickedId(removeTrigger)),
                    }),
                  );
                }),
              ),
            ),
            (a) => a.join(""),
          ),
        )}
      </div>`);
    t.event(transport);

    return () => {
      dc.destroy();
      articlesSrc.destroy();
      backendTransportInstance.destroy();
      t.destroy();
    };
  });
}
