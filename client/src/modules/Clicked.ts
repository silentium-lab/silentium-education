import { type EventType, FromEvent, Of } from "silentium";

/**
 * DOM element click even
 */
export function Clicked(elSrc: EventType<HTMLElement>) {
  return FromEvent(
    elSrc,
    Of("click"),
    Of("addEventListener"),
    Of("removeEventListener"),
  );
}
