import { InputId } from "@/components/Input";
import { MessageSourceType } from "silentium";
import { Template } from "silentium-components";

export function Textarea($value: MessageSourceType<string>) {
  return Template(
    (t) => `
      <textarea rows="20" class="${t.var(InputId($value))} border-1 p-2 rounded-sm w-full"></textarea>
    `,
  );
}
