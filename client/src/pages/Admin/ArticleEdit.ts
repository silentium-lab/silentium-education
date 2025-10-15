import { omit, partialRight } from "lodash-es";
import {
	Any,
	Applied,
	ConstructorDestroyable,
	LateShared,
	Of,
	Shared,
	type EventType,
	type EventUserType,
} from "silentium";
import {
	backendCrudSrc,
	backendTransport,
	notificationSrc,
} from "../../bootstrap";
import { SplitPart } from "../../modules/string/SplitPart";
import { i18n, titleSrc, urlSrc } from "../../store";
import type { ArticleType } from "../../types/ArticleType";
import { ArticleForm } from "./ArticleForm";
import { Branch, Constant, Detached, Loading, Shot, Task, Template, ToJson } from "silentium-components";
import { Link } from "../../components/Link";
import { Button } from "../../components/Button";

export const ArticleEdit = (): EventType<string> => (user) => {
	const title = i18n.tr("Article");
	title(titleSrc.use);

	const transport = ConstructorDestroyable(backendTransport);

	const localUrlSrc = Detached(urlSrc.event);
	const idSrc = Shared(SplitPart(localUrlSrc, Of("/"), Of(3)));
	const articleSrc = Shared(
		backendCrudSrc
			.ofModelName(Of("articles"))
			.entity(transport.get, idSrc.event),
	);
	const clickedSrc = LateShared();
	const formSrc = LateShared<ArticleType>();

	const formUpdatedSrc = Shared(
		backendCrudSrc
			.ofModelName(Of("articles"))
			.updated(
				transport.get,
				idSrc.event,
				ToJson(Shot(formSrc.event, clickedSrc.event)),
			),
	);
	const formUpdateLoadingSrc = Any(
		Loading(clickedSrc.event, formUpdatedSrc.event),
		Of(false),
	);

	Constant(
		{
			type: "success",
			content: "Успешно изменено",
		} as const,
		formUpdatedSrc.event,
	)(notificationSrc.use);

	Applied(
		Any(articleSrc.event, Task(formUpdatedSrc.event)),
		partialRight(omit, ["_id"]),
	)(formSrc.use as EventUserType);

	const t = Template();
	t.template(`<div class="article">
			${t.var(Link(Of("/admin/articles"), i18n.tr("Articles"), Of("underline")))}
        <h1 class="title-1">${t.var(title)}</h1>
		<div class="mb-2">
			<div>
				<b>id: </b>
				${t.var(idSrc.event)}
			</div>
			${t.var(ArticleForm(formSrc))}
		</div>
		${t.var(
			Button(
				Branch(formUpdateLoadingSrc, Of("Сохраняем..."), Of("Сохранить")),
				Of("btn"),
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
