import MustacheTemplate from "mustache";
import { all, type EventType } from "silentium";

export const mustache =
	(
		templateSrc: EventType<string>,
		valuesSrc: EventType<Record<string, unknown>>,
	): EventType<string> =>
	(user) => {
		all(
			templateSrc,
			valuesSrc,
		)(([template, values]) => {
			user(MustacheTemplate.render(template, values));
		});
	};
