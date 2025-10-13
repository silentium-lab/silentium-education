import { all, type EventType, on, type SourceType, shared } from "silentium";
import { first } from "silentium-components";
import { elements } from "silentium-web-api";
import { className } from "../modules/ClassName";
import { id } from "../modules/Id";
import { keyPressed } from "../modules/KeyPressed";

export const input =
	(valueSrc: SourceType<string>): EventType<string> =>
	(user) => {
		const idSrc = shared(id());
		idSrc.event(user);

		const elSrc = shared(
			first(elements<HTMLInputElement>(className(idSrc.event))),
		);

		all(
			elSrc.event,
			valueSrc.event,
		)(([el, value]) => {
			if (el) {
				el.value = value;
			}
		});

		on(keyPressed<InputEvent>(elSrc.event), (e: InputEvent) => {
			valueSrc.use((e.target as HTMLInputElement).value);
		});
	};
