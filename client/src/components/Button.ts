import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import {
  Message,
  MessageType,
  Of,
  Shared,
  Tap,
  TapType,
  Void,
} from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Button(
  $label: MessageType<string>,
  $class: MessageType<string> = Of(""),
  clickTap: TapType = Void(),
) {
  return Message<string>((transport) => {
    const $id = Shared(Id());

    const clicked = Clicked(First(Elements(ClassName($id)))).pipe(
      Tap((e) => {
        e.preventDefault();
        clickTap.use(e);
      }),
    );

    const t = Template();
    t.template(
      `<button class="${t.var($id)} ${t.var($class)} cursor-pointer">
        ${t.var($label)}
      </button>`,
    );
    t.pipe(transport);

    return () => {
      clicked.destroy();
      t.destroy();
    };
  });
}
