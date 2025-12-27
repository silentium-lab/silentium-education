import { Checkbox } from "@/components/Checkbox";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { html } from "@/modules/plugins/lang/html";
import { Mount } from "@/modules/render/Mount";
import { Tr } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { RequiredTr } from "@/validations";
import { Chainable, Computed, MessageSourceType, SourceType } from "silentium";
import { Memo, Part, Template } from "silentium-components";
import {
  Validated,
  ValidationErrors,
  ValidationItems,
} from "silentium-validation";

export function SectionForm(
  $form: MessageSourceType<ArticleType>,
  validated: SourceType<boolean>,
) {
  const $title = Part<string>($form, "title");
  const $code = Part<string>($form, "code");
  const $published = Part<boolean>($form, "published");

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [RequiredTr],
      code: [RequiredTr],
      published: [],
    }),
  );
  const $validated = Computed(Validated, $errors);
  Chainable(validated).chain(Memo($validated));

  return Template(
    (t) =>
      html`<div class="mb-2">
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Name"))}:
            ${t.raw(Mount(Error("title", $errors), "span"))}
          </div>
          ${t.raw(Input($title))}
        </div>
        <div class="mb-2">${t.raw(Checkbox(Tr("Published"), $published))}</div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Code"))}:
            ${t.raw(Mount(Error("code", $errors), "span"))}
          </div>
          ${t.raw(Input($code))}
        </div>
        <hr />
      </div>`,
  );
}
