import { Event, type EventType } from "silentium";
import { Template } from "silentium-components";
import { titleSrc } from "../store";

export function NotFound(): EventType<string> {
  return Event((transport) => {
    titleSrc.use("Не найдено");
    const t = Template();
    t.template("<div>Not found</div>");
    t.event(transport);
  });
}
