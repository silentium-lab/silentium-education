import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Categories } from "@/models/categories/Categries";
import { i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { MessageSourceType, Of } from "silentium";
import { Part, Template } from "silentium-components";

export function CategoryForm($form: MessageSourceType<ArticleType>) {
  const $title = Part<string>($form, Of("title"));
  const $parent = Part<string>($form, Of("parent_id"));

  const $categories = Categories();

  return Template(
    (t) => `<div class="mb-2">
      <div class="mb-2">
        <div class="font-bold">${t.var(i18n.tr("Parent category"))}: </div>
        ${t.var(Select($parent, $categories))}
      </div>
      <div class="mb-2">
        <div class="font-bold">${t.var(i18n.tr("Name"))}: </div>
        <input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
      </div>
      <hr>
    </div>`,
  );
}
