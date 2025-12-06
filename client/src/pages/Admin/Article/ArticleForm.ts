import { ErrorList } from "@/components/ErrorList";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Categories } from "@/models/categories/Categries";
import { Sections } from "@/models/sections/Sections";
import { i18n, Tr } from "@/store";
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

export function ArticleForm(
  $form: MessageSourceType<ArticleType>,
  validated: SourceType<boolean>,
) {
  const $title = Part<string>($form, Of("title"));
  const $content = Part<string>($form, Of("content"));
  const $category = Part<string>($form, Of("category_id"));
  const $section = Part<string>($form, Of("section_id"));

  const $categories = Categories();
  const $sections = Sections();

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [Required],
      content: [Required],
      category_id: [Required],
      section_id: [Required],
    }),
  );
  const $validated = Computed(Validated, $errors);
  Chainable(validated).chain(Memo($validated));

  return Template(
    (t) => `<div class="mb-2">
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Name"))}:
        </div>
        <input name="title" class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />

      </div>
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Category"))}:
        </div>
        ${t.var(Select($category, $categories))}
      </div>
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Section"))}:
        </div>
        ${t.var(Select($section, $sections))}
      </div>
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Content"))}:
        </div>
        <textarea rows="20" class="${t.var(Input($content))} border-1 p-2 rounded-sm w-full"></textarea>
      </div>
      ${t.var(ErrorList($errors))}
      <hr>
    </div>`,
  );
}
