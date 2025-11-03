import { Button } from "@/components/Button";
import { Applied, Event, EventType, LateShared, Of } from "silentium";
import { Concatenated, Template } from "silentium-components";

export function Counter(): EventType<string> {
  return Event((transport) => {
    const $count = LateShared(1);
    const $clicked = LateShared();
    const $reset = LateShared();

    const t = Template();
    t.template(
      `<div class="flex gap-1">
        ${t.var(
          Button(
            Concatenated([Of("clicked "), Applied($count, String)]),
            Of("btn"),
            $clicked,
          ),
        )}
        ${t.var(Button(Of("reset"), Of("btn"), $reset))}
      </div>`,
    );
    t.event(transport);

    return () => {
      t.destroy();
    };
  });
}
