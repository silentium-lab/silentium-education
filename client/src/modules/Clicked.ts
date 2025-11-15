import { FromEvent, MessageType, Of } from "silentium";

/**
 * DOM element click even
 */
export function Clicked($el: MessageType<HTMLElement>) {
  return FromEvent<Event>(
    $el,
    Of("click"),
    Of("addEventListener"),
    Of("removeEventListener"),
  );
}
