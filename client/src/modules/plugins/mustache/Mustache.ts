import MustacheTemplate from "mustache";
import { All, Message, MessageType, Transport } from "silentium";

export function Mustache(
  $template: MessageType<string>,
  $values: MessageType<Record<string, unknown>>,
) {
  return Message<string>((transport) => {
    All($template, $values).to(
      Transport(([template, values]) => {
        transport.use(MustacheTemplate.render(template, values));
      }),
    );
  });
}
