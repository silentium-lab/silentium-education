import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import { KeyPressed } from "@/modules/KeyPressed";
import { html } from "@/modules/plugins/lang/html";
import { All, Message, MessageSourceType, Shared } from "silentium";
import { Task, Template } from "silentium-components";
import { Element } from "silentium-web-api";

export function Input($value: MessageSourceType<string>) {
  return Template(
    (t) => html`
      <input
        name="title"
        class="${t.escaped(
          InputId($value),
        )} border-1 border-gray-300 bg-white p-2 rounded-sm w-full"
      />
    `,
  );
}

export function InputId($value: MessageSourceType<string>) {
  return Message<string>((transport) => {
    const $id = Shared(Id());
    $id.then(transport);

    const $el = Shared(Element<HTMLInputElement>(ClassName($id)));

    All($el, $value).then(([el, value]) => {
      if (el) {
        el.value = value;
      }
    });

    const pressed = KeyPressed<InputEvent>($el);
    Task(pressed, 150).then((e: InputEvent) => {
      $value.use((e.target as HTMLInputElement).value);
    });
  });
}
