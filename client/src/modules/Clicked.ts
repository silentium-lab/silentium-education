import { type EventType, FromEvent, Of } from "silentium";

/**
 * DOM element click even
 */
export function Clicked($el: EventType<HTMLElement>) {
  return FromEvent<Event>(
    $el,
    Of("click"),
    Of("addEventListener"),
    Of("removeEventListener"),
  );
}
