import { $notification } from "@/bootstrap";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ClickedId } from "@/modules/ClickedId";
import { ArticleType } from "@/types/ArticleType";
import {
  Chainable,
  LateShared,
  Message,
  MessageType,
  Of,
  Once,
  Shared,
  SourceType,
} from "silentium";
import {
  Constant,
  Detached,
  Path,
  Record,
  Shot,
  Template,
} from "silentium-components";

export function ArticleItem(
  $article: MessageType<ArticleType>,
  reload: SourceType,
) {
  return Message((resolve) => {
    const removeTrigger = LateShared();

    const localArticle = Detached<ArticleType>($article);
    const $removed = Shared(
      CRUD(Of("private/articles")).deleted(
        Shot(Once(Path(localArticle, Of("_id"))), Once(removeTrigger)),
      ),
    );

    Chainable(reload).chain(Constant(1, $removed));

    $notification.chain(
      Constant(
        {
          type: "success",
          content: "Успешно удалено",
        } as const,
        $removed,
      ),
    );

    const t = Template();
    t.template(`<div class="flex gap-2">
        ${t.var(
          Link(
            Template(
              Of("/admin/articles/$id/"),
              Record({ $id: Path($article, Of("_id")) }),
            ),
            Path($article, Of("title")),
            Of("underline"),
          ),
        )}
        <div class="cursor-pointer ${t.var(ClickedId(removeTrigger))}">&times;</div>
    </div>`);

    t.then(resolve);
  });
}
