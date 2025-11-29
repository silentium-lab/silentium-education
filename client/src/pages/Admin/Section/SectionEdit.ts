import { $notification } from "@/bootstrap";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { SplitPart } from "@/modules/string/SplitPart";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionForm } from "@/pages/Admin/Section/SectionForm";
import { $title, $url, i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { omit, partialRight } from "lodash-es";
import {
  Any,
  Applied,
  LateShared,
  Local,
  MessageType,
  Of,
  Primitive,
  Shared,
} from "silentium";
import {
  Branch,
  Constant,
  Detached,
  Loading,
  Shot,
  Task,
  Template,
} from "silentium-components";

export function SectionEdit() {
  $title.chain(i18n.tr("Section"));
  const config = SectionConfig();

  const $localUrl = Detached($url);
  const $id = Shared(SplitPart($localUrl, Of("/"), Of(3)));
  const $article = Shared(ServerResponse(CRUD(config.model).entity($id)));
  const $clicked = LateShared();
  const $form = LateShared<ArticleType>();

  const $formUpdated = Shared(
    ServerResponse(CRUD(config.model).updated($id, Shot($form, $clicked))),
  );
  const $formUpdateLoading = Any(Loading($clicked, $formUpdated), false);

  $notification.chain(
    Constant(
      {
        type: "success",
        content: Primitive(i18n.tr("Change success")).primitiveWithException(),
      } as const,
      $formUpdated,
    ),
  );

  $form.chain(
    <MessageType<ArticleType>>(
      Applied(Any($article, Task($formUpdated)), partialRight(omit, ["_id"]))
    ),
  );

  return Template(
    (t) => `<div class="article">
    ${t.var(Link(Of(config.path), i18n.tr("Sections"), Of("underline")))}
    <h1 class="title-1">${t.var(Local($title))}</h1>
    <div class="mb-2">
      <div>
        <b>id: </b>
        ${t.var($id)}
      </div>
      ${t.var(SectionForm($form))}
    </div>
    ${t.var(
      Button(
        Branch($formUpdateLoading, i18n.tr("Saving..."), i18n.tr("Save")),
        Of("btn"),
        $clicked,
      ),
    )}
  </div>`,
  );
}
