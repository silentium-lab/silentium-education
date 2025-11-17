import MustacheTemplate from "mustache";
import { All, Message, MessageType, Tap } from "silentium";

export function Mustache(
  $template: MessageType<string>,
  $values: MessageType<Record<string, unknown>>,
) {
  return Message<string>((transport) => {
    All($template, $values).pipe(
      Tap(([template, values]) => {
        transport.use(MustacheTemplate.render(template, values));
      }),
    );
  });
}
