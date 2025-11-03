import { Applied, Event, EventType, LateShared, Of } from "silentium";
import { $lang } from "../store";
import { Constant, Template } from "silentium-components";
import { Button } from "../components/Button";

const Active = (lang: string) =>
  Applied($lang, (l) => (l === lang ? "font-bold" : ""));

export function Lang($class: EventType<string>): EventType<string> {
  return Event((transport) => {
    const $ru = LateShared();
    const $en = LateShared();

    Constant("ru", $ru).event($lang);
    Constant("en", $en).event($lang);

    const t = Template();
    t.template(
      `<nav class="px-2 ${t.var($class)}">
			${t.var(Button(Of("ru"), Active("ru"), $ru))}
			${t.var(Button(Of("en"), Active("en"), $en))}
		</nav>`,
    );
    t.event(transport);
  });
}
