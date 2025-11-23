import { $notification } from "@/bootstrap";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { ClickedId } from "@/modules/ClickedId";
import { $title, i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import {
  Any,
  Applied,
  Chain,
  DestroyContainer,
  LateShared,
  Local,
  Map,
  Message,
  MessageType,
  Of,
  Once,
  Shared,
} from "silentium";
import {
  Constant,
  Detached,
  Path,
  Record,
  Shot,
  Template,
} from "silentium-components";

export function Articles() {
  return Message<string>((transport) => {
    $title.chain(i18n.tr("Articles"));

    const $articlesSearch = LateShared({});
    const $articles = Shared(
      ServerResponse(
        CRUD(Of("private/articles")).list($articlesSearch),
      ) as MessageType<any[]>,
    );

    const dc = DestroyContainer();

    const t = Template();
    t.template(`<div class="article">
        <h1 class="title-1">${t.var(Local($title))}</h1>
        ${t.var(Link(Of("/admin/articles/create"), Of("Создать статью"), Of("block mb-3 underline")))}
        ${t.var(
          Applied(
            Any<any>(
              Chain($articlesSearch, Of([])),
              Map($articles, (article) => {
                const removeTrigger = LateShared();

                const localArticle = Detached<ArticleType>(article);
                const removedSrc = Shared(
                  CRUD(Of("private/articles")).deleted(
                    Shot(
                      Once(Path(localArticle, Of("_id"))),
                      Once(removeTrigger),
                    ),
                  ),
                );
                $articlesSearch.chain(Constant({}, Once(removedSrc)));

                $notification.chain(
                  Constant(
                    {
                      type: "success",
                      content: "Успешно удалено",
                    } as const,
                    removedSrc,
                  ),
                );

                return Template(
                  Of(`<div class="flex gap-2">
                      $link
                      <div class="cursor-pointer $removeId">&times;</div>
                    </div>`),
                  Record({
                    $link: Link(
                      Template(
                        Of("/admin/articles/$id/"),
                        Record({ $id: Path(article, Of("_id")) }),
                      ),
                      Path(article, Of("title")),
                      Of("underline"),
                    ),
                    $removeId: dc.add(ClickedId(removeTrigger)),
                  }),
                );
              }),
            ),
            (a) => a.join(""),
          ),
        )}
      </div>`);
    t.then(transport);

    return () => {
      dc.destroy();
      $articles.destroy();
      t.destroy();
    };
  });
}
