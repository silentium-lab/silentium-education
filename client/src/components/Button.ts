import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import {
  Message,
  MessageType,
  Of,
  Shared,
  Transport,
  TransportType,
  Void,
} from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Button(
  $label: MessageType<string>,
  $class: MessageType<string> = Of(""),
  clickTransport: TransportType = Void(),
) {
  return Message<string>((transport) => {
    const $id = Shared(Id());

    const clicked = Clicked(First(Elements(ClassName($id)))).to(
      Transport((e) => {
        e.preventDefault();
        clickTransport.use(e);
      }),
    );

    const t = Template();
    t.template(
      `<button class="${t.var($id)} ${t.var($class)} cursor-pointer">
        ${t.var($label)}
      </button>`,
    );
    t.to(transport);

    return () => {
      clicked.destroy();
      t.destroy();
    };
  });
}
