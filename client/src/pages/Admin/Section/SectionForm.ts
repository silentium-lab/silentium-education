import { Error } from "@/components/Error";
import { ErrorList } from "@/components/ErrorList";
import { Input } from "@/components/Input";
import { Mount } from "@/modules/render/Mount";
import { Tr } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { RequiredTr } from "@/validations";
import {
  Chainable,
  Computed,
  MessageSourceType,
  Of,
  SourceType,
} from "silentium";
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
  const $title = Part<string>($form, Of("title"));

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [RequiredTr],
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
      ${t.var(ErrorList($errors))}
      <hr>
    </div>`,
  );
}
