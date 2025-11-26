import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { Chainable, Message, Shared, SourceType } from "silentium";

export function ClickedId(click: SourceType) {
  return Message((transport) => {
    const $id = Shared(Id());
    const $clicked = Clicked(ClassName($id));
    Chainable(click).chain($clicked);

    $id.then(transport);

    return () => {
      $clicked.destroy();
    };
  });
}
