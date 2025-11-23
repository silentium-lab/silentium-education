import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { Message, MessageType, Shared, SourceType } from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Button(
  $label: MessageType<string>,
  $class: MessageType<string>,
  click: SourceType,
) {
  return Message<string>((resolve) => {
    const $id = Shared(Id());

    const clicked = Clicked(First(Elements(ClassName($id))));
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
