import { any, DataType, lateShared, of, shared } from "silentium";
import { branch, constant, loading, path, recordOf, shot, task, template, toJson } from "silentium-components";
import { backendCrudSrc, notificationSrc } from "../../bootstrap";
import { button } from "../../components/Button";
import { link } from "../../components/Link";
import { i18n, titleSrc, urlSrc } from "../../store";
import { articleForm } from "./ArticleForm";

export const articleNew = (): DataType<string> => (user) => {
	const title = i18n.tr("Create Article");
	title(titleSrc.give);

	const clickedSrc = lateShared();
	const formSrc = lateShared({
		title: '',
		content: '',
	});

	const formUpdatedSrc = shared(backendCrudSrc.ofModelName(of('articles')).created(
		toJson(shot(formSrc.value, clickedSrc.value))
	));
	const formUpdateLoadingSrc = any(loading(clickedSrc.value, formUpdatedSrc.value), of(false));

	const insertedIdSrc = path(formUpdatedSrc.value, of('insertedId'));
	task(template(of('/admin/articles/$id/'), recordOf({
		$id: insertedIdSrc
	})).value, 900)(urlSrc.give);

	constant({
		type: 'success',
		content: 'Успешно создано'
	} as const, formUpdatedSrc.value)(notificationSrc.give);

	const t = template();
	t.template(`<div class="article">
			${t.var(link(of("/admin/articles"), i18n.tr("Articles"), of("underline")))}
        <h1 class="title-1">${t.var(title)}</h1>
		${t.var(articleForm(formSrc))}
		${t.var(button(
		branch(formUpdateLoadingSrc, of("Сохраняем..."), of('Сохранить')),
		of("btn"),
		clickedSrc.give,
	))}
      </div>`);
	t.value(user);

	return () => {
		t.destroy();
	}
}
