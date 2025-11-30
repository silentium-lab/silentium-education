import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { $title, $url, i18n } from "@/store";
import {
  Any,
  ConstructorType,
  LateShared,
  Local,
  MessageSourceType,
  MessageType,
  Of,
  Primitive,
  Shared,
} from "silentium";
import {
  Branch,
  Constant,
  Loading,
  Path,
  Record,
  Shot,
  Task,
  Template,
} from "silentium-components";

export function TemplateNew(
  $config: MessageType<TemplateConfig>,
  $listLabel: MessageType<string>,
  form: ConstructorType<[MessageSourceType<any>], MessageType<string>>,
) {
  const $clicked = LateShared();
  const $form = LateShared<any>({});

  const $formUpdated = Shared<any>(
    ServerResponse(CRUD(Path($config, "model")).created(Shot($form, $clicked))),
  );
  const formUpdateLoadingSrc = Any(Loading($clicked, $formUpdated), Of(false));

  const insertedIdSrc = Path($formUpdated, Of("insertedId"));
  $url.chain(
    Task(
      Template(
        "$config/$id/",
        Record({
          $id: insertedIdSrc,
          $config: Path($config, "path"),
        }),
      ),
      900,
    ),
  );

  $notification.chain(
    Constant(
      {
        type: "success",
        content: Primitive(i18n.tr("Created success")).primitiveWithException(),
      } as const,
      $formUpdated,
    ),
  );

  return Template(
    (t) => `<div class="article">
      ${t.var(Link(Path($config, "path"), $listLabel, Of("underline")))}
      <h1 class="title-1">${t.var(Local($title))}</h1>
      ${t.var(form($form))}
      ${t.var(
        Button(
          Branch(formUpdateLoadingSrc, i18n.tr("Saving..."), i18n.tr("Save")),
          Of("btn"),
          $clicked,
        ),
      )}
    </div>`,
  );
}
