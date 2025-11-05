import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { Event, Shared, type SourceType } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";

export function ClickedId($click: SourceType<unknown>) {
  return Event((transport) => {
    const $id = Shared(Id());
    const $el = First(Elements(ClassName($id)));

    const d = Clicked($el);
    d.event($click);

    $id.event(transport);

    return () => {
      d.destroy();
    };
  });
}
