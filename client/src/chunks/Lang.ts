import { Applied, Event, EventType, LateShared, Of } from "silentium";
import { langSrc } from "../store";
import { Constant, Template } from "silentium-components";
import { Button } from "../components/Button";

const Active = (lang: string) =>
  Applied(langSrc, (l) => (l === lang ? "font-bold" : ""));

export function Lang($class: EventType<string>): EventType<string> {
  return Event((transport) => {
    const selectRu = LateShared();
    const selectEn = LateShared();

    Constant("ru", selectRu).event(langSrc);
    Constant("en", selectEn).event(langSrc);

    const t = Template().event(transport);
    t.template(
      `<nav class="px-2 ${t.var($class)}">
			${t.var(Button(Of("ru"), Active("ru"), selectRu))}
			${t.var(Button(Of("en"), Active("en"), selectEn))}
		</nav>`,
    );
  });
}
