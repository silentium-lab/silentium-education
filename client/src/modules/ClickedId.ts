import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { Message, Shared, type SourceType } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";

export function ClickedId($click: SourceType<unknown>) {
  return Message((transport) => {
    const $id = Shared(Id());
    const $el = First(Elements(ClassName($id)));

    const d = Clicked($el);
    d.to($click);

    $id.to(transport);

    return () => {
      d.destroy();
    };
  });
}
