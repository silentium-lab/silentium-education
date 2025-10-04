import {
	DataType,
	of
} from "silentium";
import { template } from "silentium-components";

export const linkExternal = (
	urlSrc: DataType<string>,
	textSrc: DataType<string>,
	classSrc: DataType<string> = of('')
): DataType<string> => (user) => {
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
}
