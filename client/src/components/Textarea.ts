import { InputId } from "@/components/Input";
import { html } from "@/modules/plugins/lang/html";
import { MessageSourceType } from "silentium";
import { Template } from "silentium-components";

/**
 * Textarea UI element
 */
export function Textarea($value: MessageSourceType<string>) {
  return Template(
    (t) => html`
      <textarea
        rows="3"
        class="${t.escaped(
          InputId($value),
        )} border-1 border-gray-300 bg-white p-2 rounded-sm w-full"
      ></textarea>
    `,
  );
}
