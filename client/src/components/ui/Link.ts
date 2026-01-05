import { ClassName } from "@/modules/ClassName";
import { Clicked } from "@/modules/Clicked";
import { Id } from "@/modules/Id";
import { html } from "@/modules/plugins/lang/html";
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
    (t) =>
      html`<a
        href="${t.escaped($linkUrl)}"
        class="${t.escaped($id)} ${t.escaped($class)}"
      >
        ${t.raw($text)}
      </a>`,
  );
}
