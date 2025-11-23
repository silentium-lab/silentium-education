import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { Chainable, Message, Shared, SourceType } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";

export function ClickedId(click: SourceType) {
  return Message((transport) => {
    const $id = Shared(Id());
    const $el = First(Elements(ClassName($id)));

    const $clicked = Clicked($el);
    Chainable(click).chain($clicked);

    $id.then(transport);

    return () => {
      $clicked.destroy();
    };
  });
}
