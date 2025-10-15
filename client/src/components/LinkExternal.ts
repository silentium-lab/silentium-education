import { type EventType, Of } from "silentium";
import { Template } from "silentium-components";

export function LinkExternal(
	urlSrc: EventType<string>,
	textSrc: EventType<string>,
	classSrc: EventType<string> = Of(""),
): EventType<string> {
	return (user) => {
		const t = Template();
		t.template(
			`<a
			href="${t.var(urlSrc)}"
			target="_blank"
			class="${t.var(classSrc)}"
		>
			${t.var(textSrc)}
		</a>`,
		);
		t.value(user);
	};
}
