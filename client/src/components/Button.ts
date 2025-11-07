import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import {
  Event,
  type EventType,
  Of,
  Shared,
  Transport,
  TransportType,
  Void,
} from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Button(
  $label: EventType<string>,
  $class: EventType<string> = Of(""),
  clickTransport: TransportType = Void(),
): EventType<string> {
  return Event((transport) => {
    const $id = Shared(Id());

    const clicked = Clicked(First(Elements(ClassName($id)))).event(
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
    t.event(transport);

    return () => {
      clicked.destroy();
      t.destroy();
    };
  });
}
