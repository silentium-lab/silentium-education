import { Checkbox } from "@/components/Checkbox";
import { Editor } from "@/components/Editor";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import { Categories } from "@/models/categories/Categries";
import { Sections } from "@/models/sections/Sections";
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

export function ArticleForm(
  $form: MessageSourceType<ArticleType>,
  validated: SourceType<boolean>,
) {
  const $order = Part<string>($form, "order");
  const $title = Part<string>($form, "title");
  const $description = Part<string>($form, "description");
  const $content = Part<string>($form, "content");
  const $category = Part<string>($form, "category_id");
  const $section = Part<string>($form, "section_id");
  const $code = Part<string>($form, "code");
  const $published = Part<boolean>($form, "published");

  const $categories = Categories();
  const $sections = Sections();

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [RequiredTr],
      content: [RequiredTr],
      description: [RequiredTr],
      category_id: [RequiredTr],
      section_id: [],
      code: [],
      order: [],
    }),
  );
  const $validated = Computed(Validated, $errors);
  Chainable(validated).chain(Memo($validated));

  return Template(
    (t) =>
      html`<div class="mb-2">
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Sort order"))}:
            ${t.raw(Mount(Error("order", $errors), "span"))}
          </div>
          ${t.raw(Input($order))}
        </div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Name"))}:
            ${t.raw(Mount(Error("title", $errors), "span"))}
          </div>
          ${t.raw(Input($title))}
        </div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Description"))}:
            ${t.raw(Mount(Error("description", $errors), "span"))}
          </div>
          ${t.raw(Textarea($description))}
        </div>
        <div class="mb-2">${t.raw(Checkbox(Tr("Published"), $published))}</div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Category"))}:
            ${t.raw(Mount(Error("category_id", $errors), "span"))}
          </div>
          ${t.raw(Select($category, $categories))}
        </div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Section"))}:
            ${t.raw(Mount(Error("section_id", $errors), "span"))}
          </div>
          ${t.raw(Select($section, $sections))}
        </div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Content"))}:
            ${t.raw(Mount(Error("content", $errors), "span"))}
          </div>
          ${t.raw(Editor($content))}
        </div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Code"))}:
            ${t.raw(Mount(Error("code", $errors), "span"))}
          </div>
          ${t.raw(Input($code))}
        </div>
        <hr class="mt-8" />
      </div>`,
  );
}
