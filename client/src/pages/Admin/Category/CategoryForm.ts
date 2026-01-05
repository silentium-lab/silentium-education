import { Checkbox } from "@/components/ui/Checkbox";
import { Error } from "@/components/ui/Error";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Categories } from "@/models/categories/Categories";
import { Sections } from "@/models/sections/Sections";
import { html } from "@/modules/plugins/lang/html";
import { Mount } from "@/modules/render/Mount";
import { Tr } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { RequiredTr } from "@/validations";
import { Computed, MessageSourceType, SourceType } from "silentium";
import { Memo, Part, Template } from "silentium-components";
import {
  Validated,
  ValidationErrors,
  ValidationItems,
} from "silentium-validation";

export function CategoryForm(
  $form: MessageSourceType<ArticleType>,
  validated: SourceType<boolean>,
) {
  const $title = Part<string>($form, "title");
  const $parent = Part<string>($form, "parent_id");
  const $section = Part<string>($form, "section_id");
  const $code = Part<string>($form, "code");
  const $published = Part<boolean>($form, "published");

  const $categories = Categories();
  const $sections = Sections();

  const $errors = ValidationErrors(
    Computed(ValidationItems, $form, {
      title: [RequiredTr],
      code: [RequiredTr],
      parent_id: [],
      section_id: [RequiredTr],
      published: [],
    }),
  );
  const $validated = Computed(Validated, $errors);
  validated.chain(Memo($validated));

  return Template(
    (t) =>
      html`<div class="mb-2">
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Section"))}:
            ${t.raw(Mount(Error("section_id", $errors), "span"))}
          </div>
          ${t.raw(Select($section, $sections))}
        </div>
        <div class="mb-2">${t.raw(Checkbox(Tr("Published"), $published))}</div>
        <div class="mb-2">
          <div class="font-bold">
            ${t.escaped(Tr("Parent category"))}:
            ${t.raw(Mount(Error("parent_id", $errors), "span"))}
          </div>
          ${t.raw(Select($parent, $categories))}
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
            ${t.escaped(Tr("Code"))}:
            ${t.raw(Mount(Error("code", $errors), "span"))}
          </div>
          ${t.raw(Input($code))}
        </div>
        <hr />
      </div>`,
  );
}
