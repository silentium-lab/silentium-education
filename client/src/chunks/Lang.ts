import { Button } from "@/components/ui/Button";
import { html } from "@/modules/plugins/lang/html";
import { $lang } from "@/store";
import { Applied, Late, Local, MessageType, Of } from "silentium";
import { Constant, Template } from "silentium-components";

const Active = (lang: string) =>
  Applied(Local($lang), (l) => (l === lang ? "font-bold" : ""));

export function Lang($class: MessageType<string>): MessageType<string> {
  const $ru = Late();
  const $en = Late();

  $lang.chain(Constant("ru", $ru));
  $lang.chain(Constant("en", $en));

  return Template(
    (t) =>
      html`<nav class="px-2 ${t.escaped($class)}">
        ${t.raw(Button(Of("ru"), Active("ru"), $ru))}
        ${t.raw(Button(Of("en"), Active("en"), $en))}
      </nav>`,
  );
}
