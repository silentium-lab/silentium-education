import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { CRUD } from "@/modules/app/CRUD";
import { ServerResponse } from "@/modules/app/ServerResponse";
import { CategoryConfig } from "@/pages/Admin/Category/CategoryConfig";
import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { Applied, MessageSourceType, MessageType, Of, Shared } from "silentium";
import { Part, Template } from "silentium-components";

export function ArticleForm($form: MessageSourceType<ArticleType>) {
  const $title = Part<string>($form, Of("title"));
  const $content = Part<string>($form, Of("content"));
  const $category = Part<string>($form, Of("category_id"));
  const $section = Part<string>($form, Of("section_id"));

  const $categories = Shared<any>(
    ServerResponse(CRUD(CategoryConfig().model).list(Of({}))) as MessageType,
  );
  const $sections = Shared<any>(
    ServerResponse(CRUD(SectionConfig().model).list(Of({}))) as MessageType,
  );

  return Template(
    (t) => `<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">${t.var(i18n.tr("Name"))}: </div>
				<input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
			</div>
			<div class="mb-2">
				<div class="font-bold">${t.var(i18n.tr("Category"))}: </div>
				<select name="category" class="${t.var(Select($category))} border-1 p-2 rounded-sm w-full">
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
				<div class="font-bold">${t.var(i18n.tr("Section"))}: </div>
				<select class="${t.var(Select($section))} border-1 p-2 rounded-sm w-full">
          ${t.var(
            Applied($sections, (s) =>
              s
                .map((i: any) => `<option value="${i._id}">${i.title}</option>`)
                .join(""),
            ),
          )}
        </select>
			</div>
			<div class="mb-2">
				<div class="font-bold">${t.var(i18n.tr("Content"))}: </div>
				<textarea rows="20" class="${t.var(Input($content))} border-1 p-2 rounded-sm w-full"></textarea>
			</div>
      <hr>
		</div>`,
  );
}
