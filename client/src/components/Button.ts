import {
	_void,
	EventType,
	of,
	on,
	shared,
	EventUserType
} from "silentium";
import { first, template } from "silentium-components";
import { elements } from "silentium-web-api";
import { className } from "../modules/ClassName";
import { clicked } from "../modules/Clicked";
import { id } from "../modules/Id";

export const button = (
	theLabel: EventType<string>,
	theClass: EventType<string> = of(""),
	valueOwner: EventUserType = _void(),
): EventType<string> => {
	return (u) => {
		const idSrc = shared(id()).event;

		const clickDestructor = on(clicked(first(elements(className(idSrc)))), (e) => {
			e.preventDefault();
			valueOwner(e);
		});

		const t = template();
		t.template(
			`<button class="${t.var(idSrc)} ${t.var(theClass)} cursor-pointer">
        ${t.var(theLabel)}
      </button>`,
		);

		t.value(u);

		return () => {
			clickDestructor?.();
			t.destroy();
		}
	}
}
