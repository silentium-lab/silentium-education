import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import {
  Applied,
  DestroyContainer,
  Message,
  MessageType,
  Of,
  Shared,
  Void,
} from "silentium";
import { Render } from "silentium-morphdom";
import { Element } from "silentium-web-api";

export function Mount($base: MessageType<string>, tag: string = "div") {
  return Message<string>((resolve, reject) => {
    const dc = DestroyContainer();
    const $id = Shared(Id(Of("mount-point")));
    Applied($id, (id) => `<${tag} class="${id}"></${tag}>`).then(resolve);
    const $el = Element(ClassName($id)).catch(reject);
    const $r = Render($el, $base).catch(reject).then(Void());
    dc.add($el);
    dc.add($r);

    return () => {
      dc.destroy();
    };
  });
}
