import { Input } from "@/components/Input";
import type { ArticleType } from "@/types/ArticleType";
import { Message, MessageSourceType, Of } from "silentium";
import { Part, Template } from "silentium-components";

export function SectionForm($form: MessageSourceType<ArticleType>) {
  return Message<string>((resolve) => {
    const $title = Part<string>($form, Of("title"));

    const t = Template();
    t.template(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">Название: </div>
				<input class="${t.var(Input($title))} border-1 p-2 rounded-sm w-full" />
			</div>
		</div>`);
    t.then(resolve);

    return () => {
      t.destroy();
    };
  });
}
