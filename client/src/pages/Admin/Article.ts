import { omit, partialRight } from "lodash-es";
import { Applied, From, Late, type OwnerType, Shared, SharedSource, TheInformation } from "silentium";
import { RecordOf, Shot, Template, ToJson } from "silentium-components";
import { backendCrudSrc } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Mustache } from "../../modules/plugins/mustache/Mustache";
import { SplitPart } from "../../modules/string/SplitPart";
import { i18n, titleSrc, urlSrc } from "../../store";

export class Article extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Article").value(titleSrc);

		const idSrc = new Shared(new SplitPart(urlSrc, "/", 3));
		const articleSrc = new Shared(backendCrudSrc.ofModelName('articles').entity(idSrc));
		const clickedSrc = new SharedSource(new Late());
		const formSrc = new SharedSource(new Late());
		new Applied(articleSrc, partialRight(omit, ['_id'])).value(formSrc);
		const formToSaveSrc = new ToJson(new Shot(formSrc, clickedSrc));

		const formUpdatedSrc = backendCrudSrc.ofModelName('articles').updated(idSrc, formToSaveSrc);

		formUpdatedSrc.value(new From(console.log));

		const t = new Template();
		t.template(`<div class="article">
			${t.var(new Link("/admin/articles", i18n.tr("Articles"), "underline"))}
        <h1 class="title-1">${t.var(title)}</h1>
		<div>
			<b>id: </b>
			${t.var(idSrc)}
		</div>
		${t.var(new Mustache(`
			<div>
				Заголовок: {{ article.title }}
			</div>
			<div class=mb-4>
				Содержимое: {{ article.content }}
			</div>
		`, new RecordOf({ article: articleSrc })))}
		${t.var(new Button(
			"Сохранить",
			"btn",
			clickedSrc,
		))}
      </div>`).value(o);

		return this;
	}
}
