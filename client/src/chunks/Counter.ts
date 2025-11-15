import { Button } from "@/components/Button";
import { Applied, LateShared, Message, Of, Transport } from "silentium";
import { Concatenated, Template } from "silentium-components";

export function Counter() {
  return Message<string>((transport) => {
    const $count = LateShared(1);
    const $clicked = LateShared();
    const $reset = LateShared();

    $clicked.to(
      Transport(() => {
        $count.use($count.value().primitiveWithException() + 1);
      }),
    );

    $reset.to(
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
    t.to(transport);

    return () => {
      t.destroy();
    };
  });
}
