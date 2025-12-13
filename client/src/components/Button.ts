import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { ActualMessage, MaybeMessage, Of, Shared, SourceType } from "silentium";
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

  return Template(
    (
      t,
    ) => `<button ${t.var(ActualMessage($attributes))} class="${t.var($id)} ${t.var(ActualMessage($class))} cursor-pointer">
        ${t.var(ActualMessage($label))}
      </button>`,
  );
}
