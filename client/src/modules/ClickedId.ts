import { Event, type SourceType } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Id } from "../modules/Id";
import { Clicked } from "./Clicked";

export function ClickedId($click: SourceType<unknown>) {
  return Event((transport) => {
    const $id = Id();
    const $el = First(Elements(ClassName($id)));

    const d = Clicked($el);
    d.event($click);

    $id.event(transport);

    return () => {
      d.destroy();
    };
  });
}
