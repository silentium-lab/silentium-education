import { type EventType, of } from "silentium";
import { detached, router } from "silentium-components";
import { routePrivate } from "../modules/RoutePrivate";
import { titleSrc, urlSrc } from "../store";
import { articleEdit } from "./Admin/ArticleEdit";
import { articleNew } from "./Admin/ArticleNew";
import { articles } from "./Admin/Articles";
import { auth } from "./Admin/Auth";

export const admin = (): EventType<string> =>
	function Admin(user) {
		titleSrc.use("Админ панель");

		const localUrlSrc = detached(urlSrc.event);

		const r = router(
			localUrlSrc,
			of([
				{
					pattern: "^/admin$",
					template: auth,
				},
				{
					pattern: "^/admin/articles$",
					name: "list",
					template: () => routePrivate(articles()),
				},
				{
					pattern: "^/admin/articles/create$",
					name: "create",
					template: () => routePrivate(articleNew()),
				},
				{
					pattern: String.raw`^/admin/articles/.+/$`,
					name: "edit",
					template: () => routePrivate(articleEdit()),
				},
			]),
			() => of("Admin not found"),
		);
		const rDestructor = r(user);

		return function AdminDestroy() {
			rDestructor?.();
		};
	};
