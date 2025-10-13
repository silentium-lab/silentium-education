import { type EventType, of } from "silentium";
import { template } from "silentium-components";

export const linkExternal =
	(
		urlSrc: EventType<string>,
		textSrc: EventType<string>,
		classSrc: EventType<string> = of(""),
	): EventType<string> =>
	(user) => {
		const t = template();
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
