import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { Message, MessageType, Shared, SourceType } from "silentium";
import { Template } from "silentium-components";

export function Button(
  $label: MessageType<string>,
  $class: MessageType<string>,
  click: SourceType,
) {
  const $id = Shared(Id());

  return Message<string>((resolve) => {
    const clicked = Clicked(ClassName($id));
    clicked.then((e) => {
      e.preventDefault();
      click.use(e);
    });

    const t = Template();
    t.template(
      `<button class="${t.var($id)} ${t.var($class)} cursor-pointer">
        ${t.var($label)}
      </button>`,
    );
    t.then(resolve);

    return () => {
      clicked.destroy();
      t.destroy();
    };
  });
}
