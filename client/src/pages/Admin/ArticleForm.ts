import { EventType, of, SourceType } from "silentium";
import { part, template } from "silentium-components";
import { input } from "../../components/Input";
import { ArticleType } from "../../types/ArticleType";

export const articleForm = (
	formSrc: SourceType<ArticleType>
): EventType<string> => (user) => {
	const formModels = {
		title: part<string>(formSrc, of('title')),
		content: part<string>(formSrc, of('content'))
	};

	const t = template();
	t.template(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">Название: </div>
				<input class="${t.var(input(formModels.title))} border-1 p-2 rounded-sm w-full" />
			</div>
			<div class="mb-2">
				<div class="font-bold">Содержимое: </div>
				<textarea rows="20" class="${t.var(input(formModels.content))} border-1 p-2 rounded-sm w-full"></textarea>
			</div>
		</div>
	`);
	t.value(user);

	return () => {
		t.destroy();
	}
}
