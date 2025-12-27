import { Button } from "@/components/Button";
import { html } from "@/modules/plugins/lang/html";
import { Applied, Late, Of } from "silentium";
import { Concatenated, Template } from "silentium-components";

export function Counter() {
  const $count = Late(1);
  const $clicked = Late();
  const $reset = Late();

  $clicked.then(() => {
    $count.use($count.value().primitiveWithException() + 1);
  });

  $reset.then(() => {
    $count.use(1);
  });

  return Template(
    (t) =>
      html`<div class="flex gap-1">
        ${t.raw(
          Button(
            Concatenated([Of("clicked "), Applied($count, String)]),
            Of("btn"),
            $clicked,
          ),
        )}
        ${t.raw(Button(Of("reset"), Of("btn"), $reset))}
      </div>`,
  );
}
