import MustacheTemplate from "mustache";
import { All, Message, MessageType } from "silentium";

export function Mustache(
  $template: MessageType<string>,
  $values: MessageType<Record<string, unknown>>,
) {
  return Message<string>((resolve) => {
    All($template, $values).then(([template, values]) => {
      resolve(MustacheTemplate.render(template, values));
    });
  });
}
