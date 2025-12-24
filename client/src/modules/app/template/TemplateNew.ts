import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { Mount } from "@/modules/render/Mount";
import { Tr } from "@/store";
import {
  Any,
  Applied,
  ConstructorType,
  Context,
  Late,
  MessageSourceType,
  MessageType,
  Of,
  Primitive,
  Shared,
  SourceType,
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
  form: ConstructorType<
    [MessageSourceType<any>, SourceType<boolean>],
    MessageType<string>
  >,
  defaultForm: unknown = {},
) {
  const $url = Context<string>("url");
  const $clicked = Late();
  const $form = Late<any>(defaultForm);

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
        content: Primitive(Tr("Created success")).primitiveWithException(),
      } as const,
      $formUpdated,
    ),
  );

  const $validated = Late(false);

  const $title = Context("title");

  return Template(
    (t) => `<div class="article">
      ${t.var(Link(Path($config, "path"), $listLabel, Of("underline")))}
      <h1 class="title-1">${t.var($title)}</h1>
      ${t.var(form($form, $validated))}
      ${t.var(
        Mount(
          Button(
            Branch(formUpdateLoadingSrc, Tr("Saving..."), Tr("Save")),
            Applied($validated, (v) => `btn ${v ? "" : "disabled opacity-25"}`),
            $clicked,
            Applied($validated, (v) => `${v ? "" : "disabled"}`),
          ),
        ),
      )}
    </div>`,
  );
}
