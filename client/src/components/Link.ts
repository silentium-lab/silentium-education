import {
	DataType,
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
	linkUrlSrc: DataType<string>,
	textSrc: DataType<string>,
	classSrc: DataType<string> = of(""),
): DataType<string> => (user) => {
	const idSrc = shared(id());
	const sharedUrlSrc = shared(linkUrlSrc);
	const urlSync = primitive(linkUrlSrc);

	on(clicked(first(elements(className(idSrc.value)))), (e) => {
		e.preventDefault();
		urlSrc.give(urlSync.primitive() as string);
	});

	const t = template();
	t.template(
		`<a
        href="${t.var(sharedUrlSrc.value)}"
        class="${t.var(idSrc.value)} ${t.var(classSrc)}"
      >
        ${t.var(textSrc)}
      </a>`,
	)
	t.value(user);
}
