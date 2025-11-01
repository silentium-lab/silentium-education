import { Event, type EventType, Of, On, Primitive, Shared } from "silentium";
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
    const idSrc = Shared(Id()).event;
    const urlSync = Primitive(linkUrlSrc);

    On(Clicked(First(Elements(ClassName(idSrc)))), (e: Event) => {
      e.preventDefault();
      urlSrc.use(urlSync.primitive() as string);
    });

    const t = Template();
    t.template(
      `<a
        href="${t.var(linkUrlSrc)}"
        class="${t.var(idSrc)} ${t.var(classSrc)}"
      >
        ${t.var(textSrc)}
      </a>`,
    );
    t.event(transport);
  });
}
