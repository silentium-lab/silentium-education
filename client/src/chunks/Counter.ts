import { Applied, EventType, LateShared, Of, Once } from "silentium";
import { Concatenated, Template } from "silentium-components";
import { Button } from "../components/Button";

export function Counter(): EventType<string> {
  return (u) => {
    const countSrc = LateShared(1);
    const clickedSrc = LateShared();
    const resetSrc = LateShared();

    clickedSrc.event(() => {
      Once(countSrc.event)((v) => {
        countSrc.use(v + 1);
      });
    });

    resetSrc.event(() => {
      countSrc.use(1);
    });

    const t = Template();
    t.template(
      `<div class="flex gap-1">
        ${t.var(
          Button(
            Concatenated([Of("clicked "), Applied(countSrc.event, String)]),
            Of("btn"),
            clickedSrc.use,
          ),
        )}
        ${t.var(Button(Of("reset"), Of("btn"), resetSrc.use))}
      </div>`,
    );
    t.value(u);

    return () => {
      t.destroy();
    };
  };
}
