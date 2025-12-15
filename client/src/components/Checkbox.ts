import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import {
  ActualMessage,
  All,
  FromEvent,
  MaybeMessage,
  Message,
  MessageSourceType,
  Shared,
} from "silentium";
import { Template } from "silentium-components";
import { Element } from "silentium-web-api";

/**
 * Component what represent
 * checkbox
 */
export function Checkbox(
  label: MaybeMessage<string>,
  $value: MessageSourceType<boolean>,
) {
  const $label = ActualMessage(label);
  return Template(
    (t) => `
      <label>
        <input class="${t.var(CheckedId($value))} " type="checkbox">
        ${t.var($label)}
      </label>
  `,
  );
}

export function CheckedId($value: MessageSourceType<boolean>) {
  return Message<string>((resolve, reject) => {
    const $id = Shared(Id());
    $id.then(resolve);

    const $el = Shared(Element<HTMLInputElement>(ClassName($id)));

    All($el, $value).then(([el, value]) => {
      if (el) {
        el.checked = value;
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
        $value.use((e.target as HTMLInputElement).checked);
      });

    return () => {
      event.destroy();
    };
  });
}
