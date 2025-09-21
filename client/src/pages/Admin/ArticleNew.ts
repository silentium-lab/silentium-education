import { Any, Late, LateShared, Of, type OwnerType, Shared, SharedSource, TheInformation } from "silentium";
import { Branch, Const, Loading, Path, RecordOf, Shot, Task, Template, Tick, ToJson } from "silentium-components";
import { backendCrudSrc, notificationSrc } from "../../bootstrap";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { i18n, titleSrc, urlSrc } from "../../store";
import { ArticleForm } from "./ArticleForm";

export class ArticleNew extends TheInformation {
	value(o: OwnerType<unknown>): this {
		const title = i18n.tr("Create Article").value(titleSrc);

		const clickedSrc = new LateShared();
		const formSrc = new LateShared({
			title: '',
			content: '',
		});

		const formUpdatedSrc = new Shared(backendCrudSrc.ofModelName('articles').created(
			new ToJson(new Shot(formSrc, clickedSrc))
		));
		this.addDep(formUpdatedSrc);
		const formUpdateLoadingSrc = new Any(new Loading(clickedSrc, formUpdatedSrc), new Of(false));
		this.addDep(formUpdateLoadingSrc);

		const insertedIdSrc = new Path(formUpdatedSrc, new Of('insertedId'));
		this.dep(new Task(new Template('/admin/articles/$id/', new RecordOf({
			$id: insertedIdSrc
		})), 900)).value(urlSrc);

		new Const({
			type: 'success',
			content: 'Успешно создано'
		}, formUpdatedSrc).value(notificationSrc);

		const t = new Template();
		t.template(`<div class="article">
			${t.var(new Link("/admin/articles", i18n.tr("Articles"), "underline"))}
        <h1 class="title-1">${t.var(title)}</h1>
		${t.var(new ArticleForm(formSrc))}
		${t.var(new Button(
			new Branch(formUpdateLoadingSrc, new Of("Сохраняем..."), new Of('Сохранить')),
			"btn",
			clickedSrc,
		))}
      </div>`).value(o);

		return this;
	}
}
