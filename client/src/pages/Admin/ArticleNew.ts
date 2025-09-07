import { Any, From, Late, Of, type OwnerType, Shared, SharedSource, TheInformation } from "silentium";
import { Branch, Loading, Part, RecordOf, Shot, Template, ToJson } from "silentium-components";
import { backendCrudSrc } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { Mustache } from "../../modules/plugins/mustache/Mustache";
import { i18n, titleSrc } from "../../store";

export class ArticleNew extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Create Article").value(titleSrc);

		const clickedSrc = new SharedSource(new Late());
		const formSrc = new SharedSource(new Late({
            title: '',
            content: '',
        }));

		const formUpdatedSrc = new Shared(backendCrudSrc.ofModelName('articles').created(
			new ToJson(new Shot(formSrc, clickedSrc))
		));
		const formUpdateLoadingSrc = new Any(new Loading(clickedSrc, formUpdatedSrc), new Of(false));

        formSrc.value(new From(console.log));

		const t = new Template();
		t.template(`<div class="article">
			${t.var(new Link("/admin/articles", i18n.tr("Articles"), "underline"))}
        <h1 class="title-1">${t.var(title)}</h1>
		${t.var(new Mustache(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">Название: </div>
				<input class="{{ field.title }} border-1 p-2 rounded-sm w-full" />
			</div>
			<div class="mb-2">
				<div class="font-bold">Содержимое: </div>
				<textarea rows="20" class="{{ field.content }} border-1 p-2 rounded-sm w-full"></textarea>
			</div>
		</div>`, new RecordOf({
			field: new RecordOf({
				title: new Input(new Part(formSrc, 'title')),
				content: new Input(new Part(formSrc, 'content')),
			}),
		})))}
		${t.var(new Button(
			new Branch(formUpdateLoadingSrc, new Of("Сохраняем..."), new Of('Сохранить')),
			"btn",
			clickedSrc,
		))}
      </div>`).value(o);

		return this;
	}
}
