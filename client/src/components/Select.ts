import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import {
  All,
  Applied,
  FromEvent,
  Message,
  MessageSourceType,
  MessageType,
  Shared,
} from "silentium";
import { Template } from "silentium-components";
import { Element } from "silentium-web-api";

export function Select(
  $value: MessageSourceType<string>,
  $items: MessageType<unknown[]>,
) {
  return Template(
    (t) => `
      <select class="${t.var(SelectId($value))} border-1 border-gray-300 bg-white p-2 rounded-sm w-full">
        <option value=""></option>
        ${t.var(
          Applied($items, (s) =>
            s
              .map((i: any) => `<option value="${i._id}">${i.title}</option>`)
              .join(""),
          ),
        )}
      </select>
  `,
  );
}

export function SelectId($value: MessageSourceType<string>) {
  return Message<string>((resolve, reject) => {
    const $id = Shared(Id());
    $id.then(resolve);

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
    )
      .catch(reject)
      .then((e) => {
        $value.use((e.target as HTMLInputElement).value);
      });

    return () => {
      event.destroy();
    };
  });
}
