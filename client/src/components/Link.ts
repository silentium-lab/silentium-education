import { type EventType, Of, On, Primitive, Shared } from "silentium";
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
  return (user) => {
    const idSrc = Shared(Id());
    const sharedUrlSrc = Shared(linkUrlSrc);
    const urlSync = Primitive(linkUrlSrc);

    On(Clicked(First(Elements(ClassName(idSrc.event)))), (e) => {
      e.preventDefault();
      urlSrc.use(urlSync.primitive() as string);
    });

    const t = Template();
    t.template(
      `<a
        href="${t.var(sharedUrlSrc.event)}"
        class="${t.var(idSrc.event)} ${t.var(classSrc)}"
      >
        ${t.var(textSrc)}
      </a>`,
    );
    t.value(user);
  };
}
