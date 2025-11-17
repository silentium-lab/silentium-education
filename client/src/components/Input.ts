import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import { KeyPressed } from "@/modules/KeyPressed";
import { All, Message, Shared, type SourceType, Tap } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Input($value: SourceType<string>) {
  return Message<string>((transport) => {
    const $id = Shared(Id());
    $id.pipe(transport);

    const $el = Shared(First(Elements<HTMLInputElement>(ClassName($id))));

    All($el, $value).pipe(
      Tap(([el, value]) => {
        if (el) {
          el.value = value;
        }
      }),
    );

    KeyPressed<InputEvent>($el).pipe(
      Tap((e: InputEvent) => {
        $value.use((e.target as HTMLInputElement).value);
      }),
    );
  });
}
