import { Message, MessageType, Of } from "silentium";
import { Template } from "silentium-components";

export function LinkExternal(
  $url: MessageType<string>,
  $text: MessageType<string>,
  $class: MessageType<string> = Of(""),
) {
  return Message<string>((transport) => {
    const t = Template();
    t.template(
      `<a
			href="${t.var($url)}"
			target="_blank"
			class="${t.var($class)}"
		>
			${t.var($text)}
		</a>`,
    );
    t.pipe(transport);
  });
}
