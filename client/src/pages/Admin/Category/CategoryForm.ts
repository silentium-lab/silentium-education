import { Input } from "@/components/Input";
import { i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { Message, MessageSourceType, Of } from "silentium";
import { Part, Template } from "silentium-components";

export function CategoryForm($form: MessageSourceType<ArticleType>) {
  return Message<string>((resolve) => {
    const $title = Part<string>($form, Of("title"));

    const t = Template();
    t.template(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">${t.var(i18n.tr("Name"))}: </div>
				<input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
			</div>
      <hr>
		</div>`);
    t.then(resolve);

    return () => {
      t.destroy();
    };
  });
}
