import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import { All, FromEvent, Message, MessageSourceType, Shared } from "silentium";
import { Element } from "silentium-web-api";

export function Select($value: MessageSourceType<string>) {
  return Message<string>((transport) => {
    const $id = Shared(Id());
    $id.then(transport);

    const $el = Shared(Element<HTMLInputElement>(ClassName($id)));

    All($el, $value).then(([el, value]) => {
      if (el) {
        el.value = value;
      }
    });

    const event = FromEvent<Event>(
      $el,
      "change",
      "addEventListener",
      "removeEventListener",
    ).then((e) => {
      $value.use((e.target as HTMLInputElement).value);
    });

    return () => {
      event.destroy();
    };
  });
}
