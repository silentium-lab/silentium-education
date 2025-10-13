import {
	Any,
	Applied,
	Chain,
	ConstructorDestroyable,
	DestroyContainer,
	type EventType,
	LateShared,
	Map,
	Of,
	Once,
	Shared,
} from "silentium";
import {
	Constant,
	Detached,
	Path,
	RecordOf,
	Shot,
	Template
} from "silentium-components";
import {
	backendCrudSrc,
	backendTransport,
	notificationSrc,
} from "../../bootstrap";
import { link } from "../../components/Link";
import { clickedId } from "../../modules/ClickedId";
import { i18n, titleSrc } from "../../store";
import type { ArticleType } from "../../types/ArticleType";

export const Articles = (): EventType<string> => {
	return (user) => {
		const title = i18n.tr("Articles");
		title(titleSrc.use);

		const transport = ConstructorDestroyable(backendTransport);

		const articlesSearchSrc = LateShared({});
		const articlesSrc = Shared(
			backendCrudSrc
				.OfModelName(Of("articles"))
				.list(transport.get, articlesSearchSrc.event),
		);

		const dc = DestroyContainer();

		const t = Template();
		t.template(`<div class="article">
        <h1 class="title-1">${t.var(title)}</h1>
        ${t.var(link(Of("/admin/articles/create"), Of("Создать статью"), Of("block mb-3 underline")))}
        ${t.var(
					Applied(
						Any<any>(
							Chain(articlesSearchSrc.event, Of([])),
							Map(articlesSrc.event, (article) => {
								const removeTrigger = LateShared();
								removeTrigger.event(console.log);
								const localArticle = Detached<ArticleType>(article);
								const removedSrc = Shared(
									dc.add(
										backendCrudSrc
											.OfModelName(Of("articles"))
											.deleted(
												transport.get,
												Shot(
													Once(Path(localArticle, Of("_id"))),
													Once(removeTrigger.event),
												),
											),
									),
								);
								Constant({}, Once(removedSrc.event))(articlesSearchSrc.use);

								Constant(
									{
										type: "success",
										content: "Успешно удалено",
									} as const,
									removedSrc.event,
								)(notificationSrc.use);

								return Template(
									Of(`<div class="flex gap-2">
                $link
                <div class="cursor-pointer $removeId">&times;</div>
              </div>`),
									RecordOf({
										$link: link(
											Template(
												Of("/admin/articles/$id/"),
												RecordOf({ $id: Path(article, Of("_id")) }),
											).value,
											Path(article, Of("title")),
											Of("underline"),
										),
										$removeId: dc.add(clickedId(removeTrigger)),
									}),
								).value;
							}),
						),
						(a) => a.join(""),
					),
				)}
      </div>`);
		t.value(user);

		return () => {
			dc.destroy();
			articlesSrc.destroy();
			transport.destroy();
			t.destroy();
		};
	};
};
