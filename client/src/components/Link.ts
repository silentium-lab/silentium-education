import {
  Event,
  type EventType,
  Of,
  Primitive,
  Shared,
  Transport,
} from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { $url } from "@/store";

export function Link(
  $linkUrl: EventType<string>,
  $text: EventType<string>,
  $class: EventType<string> = Of(""),
) {
  return Event<string>((transport) => {
    const $id = Shared(Id());
    const url = Primitive($linkUrl);

    const clicked = Clicked(First(Elements(ClassName($id)))).event(
      Transport((e: Event) => {
        e.preventDefault();
        $url.use(url.primitive() as string);
      }),
    );

    const t = Template();
    t.template(
      `<a
        href="${t.var($linkUrl)}"
        class="${t.var($id)} ${t.var($class)}"
      >
        ${t.var($text)}
      </a>`,
    );
    t.event(transport);

    return () => {
      clicked.destroy();
    };
  });
}
