import {
	any,
	constructorDestroyable,
	type EventType,
	lateShared,
	of,
	shared,
} from "silentium";
import {
	branch,
	constant,
	loading,
	path,
	recordOf,
	shot,
	task,
	template,
	toJson,
} from "silentium-components";
import {
	backendCrudSrc,
	backendTransport,
	notificationSrc,
} from "../../bootstrap";
import { button } from "../../components/Button";
import { link } from "../../components/Link";
import { i18n, titleSrc, urlSrc } from "../../store";
import { articleForm } from "./ArticleForm";

export const articleNew = (): EventType<string> => (user) => {
	const title = i18n.tr("Create Article");
	title(titleSrc.use);

	const clickedSrc = lateShared();
	const formSrc = lateShared({
		title: "",
		content: "",
	});

	const transport = constructorDestroyable(backendTransport);
	const formUpdatedSrc = shared(
		backendCrudSrc
			.ofModelName(of("articles"))
			.created(transport.get, toJson(shot(formSrc.event, clickedSrc.event))),
	);
	const formUpdateLoadingSrc = any(
		loading(clickedSrc.event, formUpdatedSrc.event),
		of(false),
	);

	const insertedIdSrc = path(formUpdatedSrc.event, of("insertedId"));
	task(
		template(
			of("/admin/articles/$id/"),
			recordOf({
				$id: insertedIdSrc,
			}),
		).value,
		900,
	)(urlSrc.use);

	constant(
		{
			type: "success",
			content: "Успешно создано",
		} as const,
		formUpdatedSrc.event,
	)(notificationSrc.use);

	const t = template();
	t.template(`<div class="article">
			${t.var(link(of("/admin/articles"), i18n.tr("Articles"), of("underline")))}
        <h1 class="title-1">${t.var(title)}</h1>
		${t.var(articleForm(formSrc))}
		${t.var(
			button(
				branch(formUpdateLoadingSrc, of("Сохраняем..."), of("Сохранить")),
				of("btn"),
				clickedSrc.use,
			),
		)}
      </div>`);
	t.value(user);

	return () => {
		transport.destroy();
		t.destroy();
	};
};
