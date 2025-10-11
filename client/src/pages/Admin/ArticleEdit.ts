import { omit, partialRight } from "lodash-es";
import { any, applied, EventType, lateShared, of, shared, EventUserType, constructorDestroyable } from "silentium";
import { branch, constant, loading, shot, task, template, toJson } from "silentium-components";
import { backendCrudSrc, backendTransport, notificationSrc } from "../../bootstrap";
import { button } from "../../components/Button";
import { link } from "../../components/Link";
import { splitPart } from "../../modules/string/SplitPart";
import { i18n, titleSrc, urlSrc } from "../../store";
import { ArticleType } from "../../types/ArticleType";
import { articleForm } from "./ArticleForm";

export const articleEdit = (): EventType<string> => (user) => {
	const title = i18n.tr("Article")
	title(titleSrc.use);

    const transport = constructorDestroyable(backendTransport);

	const idSrc = shared(splitPart(urlSrc.event, of("/"), of(3)));
	const articleSrc = shared(backendCrudSrc.ofModelName(of('articles')).entity(
		transport.get,
		idSrc.event
	));
	const clickedSrc = lateShared();
	const formSrc = lateShared<ArticleType>();

	const formUpdatedSrc = shared(backendCrudSrc.ofModelName(of('articles')).updated(
		transport.get,
		idSrc.event,
		toJson(shot(formSrc.event, clickedSrc.event))
	));
	const formUpdateLoadingSrc = any(loading(clickedSrc.event, formUpdatedSrc.event), of(false));

	constant({
		type: 'success',
		content: 'Успешно изменено'
	} as const, formUpdatedSrc.event)(notificationSrc.use);

	applied(any(articleSrc.event, task(formUpdatedSrc.event)), partialRight(omit, ['_id']))(formSrc.use as EventUserType);

	const t = template();
	t.template(`<div class="article">
			${t.var(link(of("/admin/articles"), i18n.tr("Articles"), of("underline")))}
        <h1 class="title-1">${t.var(title)}</h1>
		<div class="mb-2">
			<div>
				<b>id: </b>
				${t.var(idSrc.event)}
			</div>
			${t.var(articleForm(formSrc))}
		</div>
		${t.var(button(
		branch(formUpdateLoadingSrc, of("Сохраняем..."), of('Сохранить')),
		of("btn"),
		clickedSrc.use,
	))}
      </div>`)
	t.value(user);

	return () => {
		transport.destroy();
		t.destroy();
	}
}
