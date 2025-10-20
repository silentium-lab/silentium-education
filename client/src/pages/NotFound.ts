import type { EventType } from "silentium";
import { titleSrc } from "../store";

export function NotFound(): EventType<string> {
  return function NotFound(u) {
    titleSrc.use("Не найдено");
    u("<div>Not found</div>");
  };
}
