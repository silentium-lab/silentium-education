import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import { KeyPressed } from "@/modules/KeyPressed";
import { All, Message, MessageSourceType, Shared } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Input($value: MessageSourceType<string>) {
  return Message<string>((transport) => {
    const $id = Shared(Id());
    $id.then(transport);

    const $el = Shared(First(Elements<HTMLInputElement>(ClassName($id))));

    All($el, $value).then(([el, value]) => {
      if (el) {
        el.value = value;
      }
    });

    KeyPressed<InputEvent>($el).then((e: InputEvent) => {
      $value.use((e.target as HTMLInputElement).value);
    });
  });
}
