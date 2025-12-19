import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
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

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [RequiredTr],
      code: [RequiredTr],
    }),
  );
  const $validated = Computed(Validated, $errors);
  Chainable(validated).chain(Memo($validated));

  return Template(
    (t) => `<div class="mb-2">
      <div class="mb-2">
        <div class="font-bold">${t.var(Tr("Name"))}: ${t.var(Mount(Error("title", $errors), "span"))}</div>
        ${t.var(Input($title))}
      </div>
      <div class="mb-2">
        <div class="font-bold">${t.var(Tr("Code"))}: ${t.var(Mount(Error("code", $errors), "span"))}</div>
        ${t.var(Input($code))}
      </div>
      <hr>
    </div>`,
  );
}
