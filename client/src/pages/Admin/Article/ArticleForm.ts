import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Categories } from "@/models/categories/Categries";
import { Sections } from "@/models/sections/Sections";
import { i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { MessageSourceType, Of } from "silentium";
import { Part, Template } from "silentium-components";

export function ArticleForm($form: MessageSourceType<ArticleType>) {
  const $title = Part<string>($form, Of("title"));
  const $content = Part<string>($form, Of("content"));
  const $category = Part<string>($form, Of("category_id"));
  const $section = Part<string>($form, Of("section_id"));

  const $categories = Categories();
  const $sections = Sections();

  return Template(
    (t) => `<div class="mb-2">
      <div class="mb-2">
        <div class="font-bold">${t.var(i18n.tr("Name"))}: </div>
        <input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
      </div>
      <div class="mb-2">
        <div class="font-bold">${t.var(i18n.tr("Category"))}: </div>
        ${t.var(Select($category, $categories))}
      </div>
      <div class="mb-2">
        <div class="font-bold">${t.var(i18n.tr("Section"))}: </div>
        ${t.var(Select($section, $sections))}
      </div>
      <div class="mb-2">
        <div class="font-bold">${t.var(i18n.tr("Content"))}: </div>
        <textarea rows="20" class="${t.var(Input($content))} border-1 p-2 rounded-sm w-full"></textarea>
      </div>
      <hr>
    </div>`,
  );
}
