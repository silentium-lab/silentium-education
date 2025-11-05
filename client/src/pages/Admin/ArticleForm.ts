import { Event, Of, type SourceType } from "silentium";
import { Part, Template } from "silentium-components";
import { Input } from "@/components/Input";
import type { ArticleType } from "@/types/ArticleType";

export function ArticleForm($form: SourceType<ArticleType>) {
  return Event<string>((transport) => {
    const $title = Part<string>($form, Of("title"));
    const $content = Part<string>($form, Of("content"));

    const t = Template();
    t.template(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">Название: </div>
				<input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
			</div>
			<div class="mb-2">
				<div class="font-bold">Содержимое: </div>
				<textarea rows="20" class="${t.var(Input($content))} border-1 p-2 rounded-sm w-full"></textarea>
			</div>
		</div>`);
    t.event(transport);

    return () => {
      t.destroy();
    };
  });
}
