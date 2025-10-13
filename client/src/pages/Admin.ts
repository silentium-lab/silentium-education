import { type EventType, Of } from "silentium";
import { Detached, Router } from "silentium-components";
import { routePrivate } from "../modules/RoutePrivate";
import { titleSrc, urlSrc } from "../store";
import { articleEdit } from "./Admin/ArticleEdit";
import { ArticleNew } from "./Admin/ArticleNew";
import { Articles } from "./Admin/Articles";
import { Auth } from "./Admin/Auth";

export const Admin = (): EventType<string> =>
	function AdminEvent(user) {
		titleSrc.use("Админ панель");

		const localUrlSrc = Detached(urlSrc.event);

		const r = Router(
			localUrlSrc,
			Of([
				{
					pattern: "^/admin$",
					template: Auth,
				},
				{
					pattern: "^/admin/articles$",
					name: "list",
					template: () => routePrivate(Articles()),
				},
				{
					pattern: "^/admin/articles/create$",
					name: "create",
					template: () => routePrivate(ArticleNew()),
				},
				{
					pattern: String.raw`^/admin/articles/.+/$`,
					name: "edit",
					template: () => routePrivate(articleEdit()),
				},
			]),
			() => Of("Admin not found"),
		);
		const rDestructor = r(user);

		return function AdminDestroy() {
			rDestructor?.();
		};
	};
