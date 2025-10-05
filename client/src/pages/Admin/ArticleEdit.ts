import { omit, partialRight } from "lodash-es";
import { any, applied, DataType, DataUserType, lateShared, of, shared } from "silentium";
import { branch, constant, loading, shot, task, template, toJson } from "silentium-components";
import { backendCrudSrc, notificationSrc } from "../../bootstrap";
import { button } from "../../components/Button";
import { link } from "../../components/Link";
import { splitPart } from "../../modules/string/SplitPart";
import { i18n, titleSrc, urlSrc } from "../../store";
import { ArticleType } from "../../types/ArticleType";
import { articleForm } from "./ArticleForm";

export const articleEdit = (): DataType<string> => (user) => {
	const title = i18n.tr("Article")
	title(titleSrc.give);

	const idSrc = shared(splitPart(urlSrc.value, of("/"), of(3)));
	const articleSrc = shared(backendCrudSrc.ofModelName(of('articles')).entity(idSrc.value));
	const clickedSrc = lateShared();
	const formSrc = lateShared<ArticleType>();

	const formUpdatedSrc = shared(backendCrudSrc.ofModelName(of('articles')).updated(
		idSrc.value,
		toJson(shot(formSrc.value, clickedSrc.value))
	));
	const formUpdateLoadingSrc = any(loading(clickedSrc.value, formUpdatedSrc.value), of(false));

	constant({
		type: 'success',
		content: 'Успешно изменено'
	} as const, formUpdatedSrc.value)(notificationSrc.give);

	applied(any(articleSrc.value, task(formUpdatedSrc.value)), partialRight(omit, ['_id']))(formSrc.give as DataUserType);

	const t = template();
	t.template(`<div class="article">
			${t.var(link(of("/admin/articles"), i18n.tr("Articles"), of("underline")))}
        <h1 class="title-1">${t.var(title)}</h1>
		<div class="mb-2">
			<div>
				<b>id: </b>
				${t.var(idSrc.value)}
			</div>
			${t.var(articleForm(formSrc))}
		</div>
		${t.var(button(
		branch(formUpdateLoadingSrc, of("Сохраняем..."), of('Сохранить')),
		of("btn"),
		clickedSrc.give,
	))}
      </div>`)
	t.value(user);

	return () => {
		t.destroy();
	}
}
