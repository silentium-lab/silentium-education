import { DataType, destructor, local, of, shared } from "silentium";
import { router } from "silentium-components";
import { routePrivate } from "../modules/RoutePrivate";
import { titleSrc, urlSrc } from "../store";
import { articleEdit } from "./Admin/ArticleEdit";
import { articleNew } from "./Admin/ArticleNew";
import { articles } from "./Admin/Articles";
import { auth } from "./Admin/Auth";

export const admin = (): DataType<string> => function Admin(user) {
	titleSrc.give("Админ панель");

	const localUrlSrc = destructor(local(urlSrc.value));

	const r = router(
		localUrlSrc.value,
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
		() => of('Admin not found'),
	);
	const rDestructor = r(user);

	return function AdminDestroy () {
		localUrlSrc.destroy();
		rDestructor?.();
	}
}
