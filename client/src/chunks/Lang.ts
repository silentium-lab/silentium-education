import { Button } from "@/components/Button";
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
    (t) => `<nav class="px-2 ${t.var($class)}">
      ${t.var(Button(Of("ru"), Active("ru"), $ru))}
      ${t.var(Button(Of("en"), Active("en"), $en))}
    </nav>`,
  );
}
