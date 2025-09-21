import { InformationType, Lazy, Of, type OwnerType, TheInformation } from "silentium";
import { Router } from "silentium-components";
import { titleSrc, urlSrc } from "../store";
import { Articles } from "./Admin/Articles";
import { Auth } from "./Admin/Auth";
import { NotFound } from "./NotFound";
import { ArticleEdit } from "./Admin/ArticleEdit";
import { RoutePrivate } from "../modules/RoutePrivate";
import { ArticleNew } from "./Admin/ArticleNew";

export class Admin extends TheInformation {
	value(o: OwnerType<unknown>): this {
		titleSrc.give("Админ панель");

		const r = new Router(
			urlSrc,
			new Of([
				{
					pattern: "^/admin$",
					template: new Lazy(() => new Auth()),
				},
				{
					pattern: "^/admin/articles$",
					template: new Lazy(() => new RoutePrivate(new Articles())),
				},
				{
					pattern: "^/admin/articles/create$",
					template: new Lazy(() => new RoutePrivate(new ArticleNew())),
				},
				{
					pattern: String.raw`^/admin/articles/.+/$`,
					template: new Lazy(() => new RoutePrivate(new ArticleEdit())),
				},
			]) as InformationType,
			new Lazy(() => new NotFound()) as any,
		).value(o);
		this.addDep(r);

		return this;
	}
}
