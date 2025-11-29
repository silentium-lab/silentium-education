import { $title } from "@/store";
import { Of } from "silentium";

export function NotFound() {
  $title.use("Не найдено");
  return Of("<div>Not found</div>");
}
