import { $title } from "@/store";
import { Message } from "silentium";
import { Template } from "silentium-components";

export function NotFound() {
  return Message<string>((transport) => {
    $title.use("Не найдено");
    const t = Template();
    t.template("<div>Not found</div>");
    t.to(transport);
  });
}
