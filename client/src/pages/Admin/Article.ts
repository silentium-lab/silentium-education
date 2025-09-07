import { omit, partialRight } from "lodash-es";
import { Any, Applied, From, Late, Of, type OwnerType, Shared, SharedSource, TheInformation } from "silentium";
import { Branch, Loading, Part, RecordOf, Shot, Template, ToJson } from "silentium-components";
import { backendCrudSrc } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { SplitPart } from "../../modules/string/SplitPart";
import { i18n, titleSrc, urlSrc } from "../../store";
import { Mustache } from "../../modules/plugins/mustache/Mustache";

export class Article extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Article").value(titleSrc);

		const idSrc = new Shared(new SplitPart(urlSrc, "/", 3));
		const articleSrc = new Shared(backendCrudSrc.ofModelName('articles').entity(idSrc));
		const clickedSrc = new SharedSource(new Late());
		const formSrc = new SharedSource(new Late());

		const formUpdatedSrc = new Shared(backendCrudSrc.ofModelName('articles').updated(
			idSrc,
			new ToJson(new Shot(formSrc, clickedSrc))
		));
		const formUpdateLoadingSrc = new Any(new Loading(clickedSrc, formUpdatedSrc), new Of(false));

		new Applied(new Any(articleSrc, formUpdatedSrc), partialRight(omit, ['_id'])).value(formSrc);

		const t = new Template();
		t.template(`<div class="article">
			${t.var(new Link("/admin/articles", i18n.tr("Articles"), "underline"))}
        <h1 class="title-1">${t.var(title)}</h1>
		${t.var(new Mustache(`<div class="mb-2">
			<div>
				<b>id: </b>
				{{ article._id }}
			</div>
			<div class="mb-2">
				<div class="font-bold">Название: </div>
				<input class="{{ field.title }} border-1 p-2 rounded-sm w-full" value="{{ form.title }}" />
			</div>
			<div class="mb-2">
				<div class="font-bold">Содержимое: </div>
				<textarea rows="20" class="{{ field.content }} border-1 p-2 rounded-sm w-full">{{ form.content }}</textarea>
			</div>
		</div>`, new RecordOf({
			article: articleSrc,
			form: formSrc,
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
