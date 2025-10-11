import {
	EventType,
	of,
	on,
	primitive,
	shared,
} from "silentium";
import { first, template } from "silentium-components";
import { elements } from "silentium-web-api";
import { className } from "../modules/ClassName";
import { clicked } from "../modules/Clicked";
import { id } from "../modules/Id";
import { urlSrc } from "../store";

export const link = (
	linkUrlSrc: EventType<string>,
	textSrc: EventType<string>,
	classSrc: EventType<string> = of(""),
): EventType<string> => (user) => {
	const idSrc = shared(id());
	const sharedUrlSrc = shared(linkUrlSrc);
	const urlSync = primitive(linkUrlSrc);

	on(clicked(first(elements(className(idSrc.event)))), (e) => {
		e.preventDefault();
		urlSrc.use(urlSync.primitive() as string);
	});

	const t = template();
	t.template(
		`<a
        href="${t.var(sharedUrlSrc.event)}"
        class="${t.var(idSrc.event)} ${t.var(classSrc)}"
      >
        ${t.var(textSrc)}
      </a>`,
	)
	t.value(user);
}
