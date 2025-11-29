import { $notification } from "@/bootstrap";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ClickedId } from "@/modules/ClickedId";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { i18n } from "@/store";
import { ArticleType } from "@/types/ArticleType";
import {
  Chainable,
  LateShared,
  MessageType,
  Of,
  Once,
  Primitive,
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

export function CategoryItem(
  $article: MessageType<ArticleType>,
  reload: SourceType,
) {
  const removeTrigger = LateShared();
  const config = CategoryConfig();

  const localArticle = Detached<ArticleType>($article);
  const $removed = Shared(
    CRUD(config.model).deleted(
      Shot(Once(Path(localArticle, "_id")), Once(removeTrigger)),
    ),
  );

  Chainable(reload).chain(Constant(1, $removed));

  $notification.chain(
    Constant(
      {
        type: "success",
        content: Primitive(i18n.tr("Delete success")).primitiveWithException(),
      } as const,
      $removed,
    ),
  );

  const t = Template();
  t.template(`<div class="flex gap-2">
    ${t.var(
      Link(
        Template(
          Of(`${config.path}/$id/`),
          Record({ $id: Path($article, Of("_id")) }),
        ),
        Path($article, Of("title")),
        Of("underline"),
      ),
    )}
    <div class="cursor-pointer ${t.var(ClickedId(removeTrigger))}">&times;</div>
  </div>`);

  return t;
}
