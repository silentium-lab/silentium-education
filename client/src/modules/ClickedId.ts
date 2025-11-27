import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { Message, Shared, SourceType } from "silentium";

export function ClickedId(click: SourceType) {
  return Message<string>((transport) => {
    const $id = Shared(Id());
    const $clicked = Clicked(ClassName($id));
    $clicked.then((e) => {
      e.preventDefault();
      click.use(e);
    });

    $id.then(transport);

    return () => {
      $clicked.destroy();
    };
  });
}
