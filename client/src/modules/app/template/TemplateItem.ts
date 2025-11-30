import { $notification } from "@/bootstrap";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { ClickedId } from "@/modules/ClickedId";
import { i18n } from "@/store";
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

export function TemplateItem(
  $config: MessageType<TemplateConfig>,
  $item: MessageType<any>,
  reload: SourceType,
  $titleField = Of("title"),
) {
  const removeTrigger = LateShared();

  const localItem = Detached<any>($item);
  const $removed = Shared(
    CRUD(Path($config, "model")).deleted(
      Shot(Once(Path(localItem, "_id")), Once(removeTrigger)),
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

  return Template(
    (t) => `<div class="flex gap-2">
      ${t.var(
        Link(
          Template(
            "$config/$id/",
            Record({
              $id: Path($item, Of("_id")),
              $config: Path($config, "path"),
            }),
          ),
          Path($item, $titleField),
          Of("underline"),
        ),
      )}
      <div class="cursor-pointer ${t.var(ClickedId(removeTrigger))}">&times;</div>
    </div>`,
  );
}
