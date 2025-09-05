import { InformationType, Lazy, Of, type OwnerType, TheInformation } from "silentium";
import { Router } from "silentium-components";
import { titleSrc, urlSrc } from "../store";
import { Articles } from "./Admin/Articles";
import { Auth } from "./Admin/Auth";
import { NotFound } from "./NotFound";
import { Article } from "./Admin/Article";
import { RoutePrivate } from "../modules/RoutePrivate";

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
					pattern: String.raw`^/admin/articles/\d+$`,
					template: new Lazy(() => new RoutePrivate(new Article())),
				},
			]) as InformationType,
			new Lazy(() => new NotFound()) as any,
		).value(o);
		this.addDep(r);

		return this;
	}
}
