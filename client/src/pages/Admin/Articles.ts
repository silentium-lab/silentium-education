import { CRUD } from "../../modules/app/CRUD";
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
import { $notification } from "../../bootstrap";
import { Link } from "../../components/Link";
import { ClickedId } from "../../modules/ClickedId";
import { $title, i18n } from "../../store";
import type { ArticleType } from "../../types/ArticleType";

export function Articles(): EventType<string> {
  return Event((transport) => {
    const title = i18n.tr("Articles");
    title.event($title);

    const articlesSearchSrc = LateShared({});
    const articlesSrc = Shared(
      CRUD(Of("private/articles")).list(articlesSearchSrc).result(),
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
                    CRUD(Of("private/articles"))
                      .deleted(
                        Shot(
                          Once(Path(localArticle, Of("_id"))),
                          Once(removeTrigger),
                        ),
                      )
                      .result(),
                  );
                  Constant({}, Once(removedSrc)).event(articlesSearchSrc);

                  Constant(
                    {
                      type: "success",
                      content: "Успешно удалено",
                    } as const,
                    removedSrc,
                  ).event($notification);

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
      t.destroy();
    };
  });
}
