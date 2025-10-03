import {
	applied,
	DataType,
	lateShared,
	of,
	once
} from "silentium";
import { concatenated, template } from "silentium-components";
import { button } from "../components/Button";

export const counter = (): DataType<string> => {
	return (u) => {
		const countSrc = lateShared(1);
		const clickedSrc = lateShared();
		const resetSrc = lateShared();

		clickedSrc.value(
			() => {
				once(countSrc.value)(
					(v) => {
						countSrc.give(v + 1);
					}
				);
			}
		);

		resetSrc.value(
			() => {
				countSrc.give(1);
			}
		);

		const t = template();
		t.template(
			`<div class="flex gap-1">
        ${t.var(
				button(
					concatenated([
						of("clicked "),
						applied(countSrc.value, String),
					]),
					of("btn"),
					clickedSrc.give,
				),
			)}
        ${t.var(button(of("reset"), of("btn"), resetSrc.give))}
      </div>`,
		)
		t.value(u);
	}
};
