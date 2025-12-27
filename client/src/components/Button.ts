import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { html } from "@/modules/plugins/lang/html";
import {
  ActualMessage,
  Connected,
  MaybeMessage,
  Of,
  Shared,
  SourceType,
} from "silentium";
import { Template } from "silentium-components";

export function Button(
  $label: MaybeMessage<string>,
  $class: MaybeMessage<string>,
  click: SourceType,
  $attributes: MaybeMessage<string> = Of(""),
  value?: unknown,
) {
  const $id = Shared(Id());
  const clicked = Clicked(ClassName($id));
  clicked.then((e) => {
    e.preventDefault();
    click.use(value ?? e);
  });
  return Connected<string>(
    Template(
      (t) =>
        html`<button
          ${t.escaped(ActualMessage($attributes))}
          class="${t.escaped($id)} ${t.escaped(
            ActualMessage($class),
          )} cursor-pointer"
        >
          ${t.escaped(ActualMessage($label))}
        </button>`,
    ),
    clicked,
  );
}
