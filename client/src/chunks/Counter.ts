import { Button } from "@/components/Button";
import { Applied, Event, LateShared, Of, Transport } from "silentium";
import { Concatenated, Template } from "silentium-components";

export function Counter() {
  return Event<string>((transport) => {
    const $count = LateShared(1);
    const $clicked = LateShared();
    const $reset = LateShared();

    $clicked.event(
      Transport(() => {
        $count.use($count.value().primitiveWithException() + 1);
      }),
    );

    $reset.event(
      Transport(() => {
        $count.use(1);
      }),
    );

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
