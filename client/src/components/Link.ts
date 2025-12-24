import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { MessageType, Of, Primitive, Shared, Context } from "silentium";
import { Template } from "silentium-components";

export function Link(
  $linkUrl: MessageType<string>,
  $text: MessageType<string>,
  $class: MessageType<string> = Of(""),
) {
  const $url = Context<string>("url");
  const $id = Shared(Id());
  const url = Primitive($linkUrl);

  const clicked = Clicked(ClassName($id));
  clicked.then((e: Event) => {
    e.preventDefault();
    $url.use(url.primitive() as string);
  });

  return Template(
    (t) => `<a
      href="${t.var($linkUrl)}"
      class="${t.var($id)} ${t.var($class)}"
    >
      ${t.var($text)}
    </a>`,
  );
}
