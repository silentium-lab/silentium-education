import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { MessageType, Of, Shared, SourceType } from "silentium";
import { Template } from "silentium-components";

export function Button(
  $label: MessageType<string>,
  $class: MessageType<string>,
  click: SourceType,
  $attributes = Of(""),
) {
  const $id = Shared(Id());
  const clicked = Clicked(ClassName($id));
  clicked.then((e) => {
    e.preventDefault();
    click.use(e);
  });

  return Template(
    (
      t,
    ) => `<button ${t.var($attributes)} class="${t.var($id)} ${t.var($class)} cursor-pointer">
        ${t.var($label)}
      </button>`,
  );
}
