import {
	type EventType,
	type EventUserType,
	Of,
	On,
	Shared,
	Void
} from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Clicked } from "../modules/Clicked";
import { Id } from "../modules/Id";

export function Button(
	theLabel: EventType<string>,
	theClass: EventType<string> = Of(""),
	valueOwner: EventUserType = Void(),
): EventType<string> {
	return (u) => {
		const idSrc = Shared(Id()).event;

		const clickDestructor = On(
			Clicked(First(Elements(ClassName(idSrc)))),
			(e) => {
				e.preventDefault();
				valueOwner(e);
			},
		);

		const t = Template();
		t.template(
			`<button class="${t.var(idSrc)} ${t.var(theClass)} cursor-pointer">
        ${t.var(theLabel)}
      </button>`,
		);

		t.value(u);

		return () => {
			clickDestructor?.();
			t.destroy();
		};
	};
}
