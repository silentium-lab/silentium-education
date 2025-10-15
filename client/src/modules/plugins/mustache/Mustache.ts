import MustacheTemplate from "mustache";
import { All, type EventType } from "silentium";

export function Mustache(
	templateSrc: EventType<string>,
	valuesSrc: EventType<Record<string, unknown>>,
): EventType<string> {
	return (user) => {
		All(
			templateSrc,
			valuesSrc,
		)(([template, values]) => {
			user(MustacheTemplate.render(template, values));
		});
	};
}
