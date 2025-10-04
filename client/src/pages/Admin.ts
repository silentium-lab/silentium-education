import { DataType, of, shared } from "silentium";
import { router } from "silentium-components";
import { routePrivate } from "../modules/RoutePrivate";
import { titleSrc, urlSrc } from "../store";
import { articleEdit } from "./Admin/ArticleEdit";
import { articleNew } from "./Admin/ArticleNew";
import { articles } from "./Admin/Articles";
import { auth } from "./Admin/Auth";
import { notFound } from "./NotFound";

export const admin = (): DataType<string> => (user) => {
	titleSrc.give("Админ панель");

	shared(router(
		urlSrc.value,
		of([
			{
				pattern: "^/admin$",
				template: auth,
			},
			{
				pattern: "^/admin/articles$",
				template: () => routePrivate(articles()),
			},
			{
				pattern: "^/admin/articles/create$",
				template: () => routePrivate(articleNew()),
			},
			{
				pattern: String.raw`^/admin/articles/.+/$`,
				template: () => routePrivate(articleEdit()),
			},
		]),
		notFound,
	)).value(user);
}
