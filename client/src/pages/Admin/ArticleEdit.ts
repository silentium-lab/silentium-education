import { omit, partialRight } from "lodash-es";
import { Any, Applied, From, Late, Of, type OwnerType, Shared, SharedSource, TheInformation } from "silentium";
import { Branch, Const, Loading, Shot, Template, Tick, ToJson } from "silentium-components";
import { backendCrudSrc, notificationSrc } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { SplitPart } from "../../modules/string/SplitPart";
import { i18n, titleSrc, urlSrc } from "../../store";
import { ArticleForm } from "./ArticleForm";

export class ArticleEdit extends TheInformation {
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

		new Const({
			type: 'success',
			content: 'Успешно изменено'
		}, formUpdatedSrc).value(notificationSrc);

		new Applied(new Any(articleSrc, new Tick(formUpdatedSrc)), partialRight(omit, ['_id'])).value(formSrc);

		const t = new Template();
		t.template(`<div class="article">
			${t.var(new Link("/admin/articles", i18n.tr("Articles"), "underline"))}
        <h1 class="title-1">${t.var(title)}</h1>
		<div class="mb-2">
			<div>
				<b>id: </b>
				${t.var(idSrc)}
			</div>
			${t.var(new ArticleForm(formSrc))}
		</div>
		${t.var(new Button(
			new Branch(formUpdateLoadingSrc, new Of("Сохраняем..."), new Of('Сохранить')),
			"btn",
			clickedSrc,
		))}
      </div>`).value(o);

		return this;
	}
}
