import { Event, type SourceType } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Id } from "../modules/Id";
import { Clicked } from "./Clicked";

export function ClickedId(clickSrc: SourceType<unknown>) {
  return Event((transport) => {
    const idSrc = Id();

    const elSrc = First(Elements(ClassName(idSrc)));

    const d = Clicked(elSrc);
    d.event(clickSrc);

    idSrc.event(transport);

    return () => {
      d.destroy();
    };
  });
}
