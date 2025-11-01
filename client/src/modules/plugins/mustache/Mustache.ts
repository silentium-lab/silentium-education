import MustacheTemplate from "mustache";
import { All, Event, type EventType } from "silentium";

export function Mustache(
  templateSrc: EventType<string>,
  valuesSrc: EventType<Record<string, unknown>>,
): EventType<string> {
  return Event((transport) => {
    All(
      templateSrc,
      valuesSrc,
    )(([template, values]) => {
      transport.use(MustacheTemplate.render(template, values));
    });
  });
}
