import { applied, type EventType, lateShared, of, once } from "silentium";
import { concatenated, template } from "silentium-components";
import { button } from "../components/Button";

export const counter = (): EventType<string> => {
	return (u) => {
		const countSrc = lateShared(1);
		const clickedSrc = lateShared();
		const resetSrc = lateShared();

		clickedSrc.event(() => {
			once(countSrc.event)((v) => {
				countSrc.use(v + 1);
			});
		});

		resetSrc.event(() => {
			countSrc.use(1);
		});

		const t = template();
		t.template(
			`<div class="flex gap-1">
        ${t.var(
					button(
						concatenated([of("clicked "), applied(countSrc.event, String)]),
						of("btn"),
						clickedSrc.use,
					),
				)}
        ${t.var(button(of("reset"), of("btn"), resetSrc.use))}
      </div>`,
		);
		t.value(u);

		return () => {
			t.destroy();
		};
	};
};
