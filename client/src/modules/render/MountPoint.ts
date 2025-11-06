import { ClassName } from "@/modules/ClassName";
import { Id } from "@/modules/Id";
import { Event, EventType, Shared, Void } from "silentium";
import { Render } from "silentium-morphdom";
import { Element } from "silentium-web-api";

/**
 * Returns a unique class id that needs to be used
 * in the template for mounting $base.
 * This technique allows decoupling
 * the rendering of the main template from the rendering
 * of some nested part.
 */
export function MountPoint($base: EventType<string>) {
  return Event<string>((transport) => {
    const $id = Shared(Id());
    $id.event(transport);
    const $el = Element(ClassName($id));
    Render($el, $base).event(Void());
  });
}
