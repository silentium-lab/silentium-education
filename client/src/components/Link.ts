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
import { ClassName } from "../modules/ClassName";
import { Clicked } from "../modules/Clicked";
import { Id } from "../modules/Id";
import { urlSrc } from "../store";

export function Link(
  linkUrlSrc: EventType<string>,
  textSrc: EventType<string>,
  classSrc: EventType<string> = Of(""),
): EventType<string> {
  return Event((transport) => {
    const $id = Shared(Id());
    const $url = Primitive(linkUrlSrc);

    Clicked(First(Elements(ClassName($id)))).event(
      Transport((e: Event) => {
        e.preventDefault();
        urlSrc.use($url.primitive() as string);
      }),
    );

    const t = Template();
    t.template(
      `<a
        href="${t.var(linkUrlSrc)}"
        class="${t.var($id)} ${t.var(classSrc)}"
      >
        ${t.var(textSrc)}
      </a>`,
    );
    t.event(transport);
  });
}
