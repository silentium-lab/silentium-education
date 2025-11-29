import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { Applied, MessageSourceType, MessageType, Of, Shared } from "silentium";
import { Part, Template } from "silentium-components";

export function CategoryForm($form: MessageSourceType<ArticleType>) {
  const $title = Part<string>($form, Of("title"));
  const $parent = Part<string>($form, Of("parent_id"));

  const $categories = Shared<any>(
    ServerResponse(CRUD(CategoryConfig().model).list(Of({}))) as MessageType,
  );

  const t = Template();
  t.template(`<div class="mb-2">
    <div class="mb-2">
      <div class="font-bold">${t.var(i18n.tr("Parent category"))}: </div>
      <select name="category" class="${t.var(Select($parent))} border-1 p-2 rounded-sm w-full">
        <option>Без родителя</option>
        ${t.var(
          Applied($categories, (s) =>
            s
              .map((i: any) => `<option value="${i._id}">${i.title}</option>`)
              .join(""),
          ),
        )}
      </select>
    </div>
    <div class="mb-2">
      <div class="font-bold">${t.var(i18n.tr("Name"))}: </div>
      <input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
    </div>
    <hr>
  </div>`);

  return t;
}
