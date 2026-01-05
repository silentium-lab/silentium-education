import { $notification } from "@/bootstrap";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { CRUDEntity } from "@/modules/app/crud/CRUDEntity";
import { CRUDUpdated } from "@/modules/app/crud/CRUDUpdated";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { TemplateConfig } from "@/modules/app/template/TemplateConfig";
import { Tr } from "@/modules/I18n";
import { html } from "@/modules/plugins/lang/html";
import { Mount } from "@/modules/render/Mount";
import { SplitPart } from "@/modules/string/SplitPart";
import { omit, partialRight } from "lodash-es";
import {
  Any,
  Applied,
  ConstructorType,
  Context,
  Late,
  MessageSourceType,
  MessageType,
  New,
  Of,
  Primitive,
  Shared,
  SourceType,
} from "silentium";
import {
  Branch,
  Detached,
  Loading,
  Path,
  Polling,
  Shot,
  Task,
  Template,
} from "silentium-components";

export function TemplateEdit(
  $config: MessageType<TemplateConfig>,
  $listLabel: MessageType<string>,
  form: ConstructorType<
    [MessageSourceType<any>, SourceType<boolean>],
    MessageType<string>
  >,
) {
  const $url = Context<string>("url");
  const $title = Context<string>("title");
  const $localUrl = Detached($url);
  const $id = Shared(SplitPart($localUrl, Of("/"), Of(3)));
  const $article = Shared(
    ServerResponse(CRUDEntity(Path($config, "model"), $id)),
  );
  const $clicked = Late();
  const $form = Late<any>();

  const $formUpdated = Shared(
    ServerResponse(
      CRUDUpdated(Path($config, "model"), $id, Shot($form, $clicked)),
    ),
  );
  const $formUpdateLoading = Any(Loading($clicked, $formUpdated), false);

  $notification.chain(
    Polling(
      New(() => ({
        type: "success",
        content: Primitive(Tr("Saved successfully")).primitiveWithException(),
      })),
      $formUpdated,
    ),
  );

  $form.chain(
    Applied(Any($article, Task($formUpdated)), partialRight(omit, ["_id"])),
  );
  const $validated = Late(false);

  return Template(
    (t) =>
      html`<div class="article">
        ${t.raw(Link(Path($config, "path"), $listLabel, Of("underline")))}
        <h1 class="title-1">${t.escaped($title)}</h1>
        <div class="mb-2">
          <div>
            <b>id: </b>
            ${t.escaped($id)}
          </div>
          ${t.raw(Mount(form($form, $validated)))}
        </div>
        ${t.raw(
          Mount(
            Button(
              Branch($formUpdateLoading, Tr("Saving..."), Tr("Save")),
              Applied(
                $validated,
                (v) => html`btn ${v ? "" : "disabled opacity-25"}`,
              ),
              $clicked,
              Applied($validated, (v) => (v ? "" : "disabled")),
            ),
          ),
        )}
      </div>`,
  );
}
