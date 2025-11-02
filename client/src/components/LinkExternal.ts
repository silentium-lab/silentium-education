import { Event, type EventType, Of } from "silentium";
import { Template } from "silentium-components";

export function LinkExternal(
  $url: EventType<string>,
  $text: EventType<string>,
  $class: EventType<string> = Of(""),
): EventType<string> {
  return Event((transport) => {
    const t = Template().event(transport);
    t.template(
      `<a
			href="${t.var($url)}"
			target="_blank"
			class="${t.var($class)}"
		>
			${t.var($text)}
		</a>`,
    );
  });
}
