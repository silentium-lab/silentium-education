import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { $url } from "@/store";
import { Message, MessageType, Of, Primitive, Shared, Tap } from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";

export function Link(
  $linkUrl: MessageType<string>,
  $text: MessageType<string>,
  $class: MessageType<string> = Of(""),
) {
  return Message<string>((transport) => {
    const $id = Shared(Id());
    const url = Primitive($linkUrl);

    const clicked = Clicked(First(Elements(ClassName($id)))).pipe(
      Tap((e: Event) => {
        e.preventDefault();
        $url.use(url.primitive() as string);
      }),
    );

    const t = Template();
    t.template(
      `<a
        href="${t.var($linkUrl)}"
        class="${t.var($id)} ${t.var($class)}"
      >
        ${t.var($text)}
      </a>`,
    );
    t.pipe(transport);

    return () => {
      clicked.destroy();
    };
  });
}
