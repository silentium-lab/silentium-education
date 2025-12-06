import { ErrorList } from "@/components/ErrorList";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Categories } from "@/models/categories/Categries";
import { Tr } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import {
  Chainable,
  Computed,
  MessageSourceType,
  Of,
  SourceType,
} from "silentium";
import { Memo, Part, Template } from "silentium-components";
import {
  Required,
  Validated,
  ValidationErrors,
  ValidationItems,
} from "silentium-validation";

export function CategoryForm(
  $form: MessageSourceType<ArticleType>,
  validated: SourceType<boolean>,
) {
  const $title = Part<string>($form, Of("title"));
  const $parent = Part<string>($form, Of("parent_id"));

  const $categories = Categories();

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [Required],
      parent_id: [Required],
    }),
  );
  const $validated = Computed(Validated, $errors);
  Chainable(validated).chain(Memo($validated));

  return Template(
    (t) => `<div class="mb-2">
      <div class="mb-2">
        <div class="font-bold">${t.var(Tr("Parent category"))}: </div>
        ${t.var(Select($parent, $categories))}
      </div>
      <div class="mb-2">
        <div class="font-bold">${t.var(Tr("Name"))}: </div>
        <input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
      </div>
      ${t.var(ErrorList($errors))}
      <hr>
    </div>`,
  );
}
