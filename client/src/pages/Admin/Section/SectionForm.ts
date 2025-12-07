import { ErrorList } from "@/components/ErrorList";
import { InputId } from "@/components/Input";
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
        <div class="font-bold">${t.var(Tr("Name"))}: </div>
        <input class="${t.var(InputId($title))} border-1 p-2 rounded-sm w-full" />
      </div>
      ${t.var(ErrorList($errors))}
      <hr>
    </div>`,
  );
}
