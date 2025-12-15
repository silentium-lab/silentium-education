import { Editor } from "@/components/Editor";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Categories } from "@/models/categories/Categries";
import { Sections } from "@/models/sections/Sections";
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

export function ArticleForm(
  $form: MessageSourceType<ArticleType>,
  validated: SourceType<boolean>,
) {
  const $title = Part<string>($form, "title");
  const $content = Part<string>($form, "content");
  const $category = Part<string>($form, "category_id");
  const $section = Part<string>($form, "section_id");

  const $categories = Categories();
  const $sections = Sections();

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [RequiredTr],
      content: [RequiredTr],
      category_id: [RequiredTr],
      section_id: [RequiredTr],
    }),
  );
  const $validated = Computed(Validated, $errors);
  Chainable(validated).chain(Memo($validated));

  return Template(
    (t) => `<div class="mb-2">
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Name"))}: ${t.var(Mount(Error("title", $errors), "span"))}
        </div>
        ${t.var(Input($title))}
      </div>
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Category"))}: ${t.var(Mount(Error("category_id", $errors), "span"))}
        </div>
        ${t.var(Select($category, $categories))}
      </div>
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Section"))}: ${t.var(Mount(Error("section_id", $errors), "span"))}
        </div>
        ${t.var(Select($section, $sections))}
      </div>
      <div class="mb-2">
        <div class="font-bold">
          ${t.var(Tr("Content"))}: ${t.var(Mount(Error("content", $errors), "span"))}
        </div>
        ${t.var(Editor($content))}
      </div>
      <hr>
    </div>`,
  );
}
