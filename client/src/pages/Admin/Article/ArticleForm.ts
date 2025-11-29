import { Input } from "@/components/Input";
import { i18n } from "@/store";
import type { ArticleType } from "@/types/ArticleType";
import { Message, MessageSourceType, Of } from "silentium";
import { Part, Template } from "silentium-components";

export function ArticleForm($form: MessageSourceType<ArticleType>) {
  return Message<string>((resolve) => {
    const $title = Part<string>($form, Of("title"));
    const $content = Part<string>($form, Of("content"));

    const t = Template();
    t.template(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">${t.var(i18n.tr("Name"))}: </div>
				<input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
			</div>
			<div class="mb-2">
				<div class="font-bold">${t.var(i18n.tr("Content"))}: </div>
				<textarea rows="20" class="${t.var(Input($content))} border-1 p-2 rounded-sm w-full"></textarea>
			</div>
      <hr>
		</div>`);
    t.then(resolve);

    return () => {
      t.destroy();
    };
  });
}
