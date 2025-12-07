import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import { Applied, Message, MessageType, Of, Shared, Void } from "silentium";
import { Render } from "silentium-morphdom";
import { Element } from "silentium-web-api";

export function Mount($base: MessageType<string>, tag: string = "div") {
  return Message<string>((resolve, reject) => {
    const $id = Shared(Id(Of("mount-point")));
    Applied($id, (id) => `<${tag} class="${id}"></${tag}>`).then(resolve);
    const $el = Element(ClassName($id)).catch(reject);
    Render($el, $base).catch(reject).then(Void());
  });
}
