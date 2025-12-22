import { Context, Of } from "silentium";

export function NotFound() {
  Context("title").use("Не найдено");
  return Of("<div>Not found</div>");
}
