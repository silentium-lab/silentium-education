import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import { KeyPressed } from "@/modules/KeyPressed";
import {
  All,
  Event,
  type EventType,
  Shared,
  type SourceType,
  Transport,
} from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Input($value: SourceType<string>): EventType<string> {
  return Event((transport) => {
    const $id = Shared(Id());
    $id.event(transport);

    const $el = Shared(First(Elements<HTMLInputElement>(ClassName($id))));

    All($el, $value).event(
      Transport(([el, value]) => {
        if (el) {
          el.value = value;
        }
      }),
    );

    KeyPressed<InputEvent>($el).event(
      Transport((e: InputEvent) => {
        $value.use((e.target as HTMLInputElement).value);
      }),
    );
  });
}
