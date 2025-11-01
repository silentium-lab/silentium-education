import MustacheTemplate from "mustache";
import { All, Event, Transport, type EventType } from "silentium";

export function Mustache(
  $template: EventType<string>,
  $values: EventType<Record<string, unknown>>,
): EventType<string> {
  return Event((transport) => {
    All($template, $values).event(
      Transport(([template, values]) => {
        transport.use(MustacheTemplate.render(template, values));
      }),
    );
  });
}
