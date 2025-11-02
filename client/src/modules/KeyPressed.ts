import { Event, type EventType, FromEvent, Of } from "silentium";

/**
 * DOM element keypress even
 */
export function KeyPressed<T extends Event>(
  $el: EventType<HTMLElement>,
): EventType<T> {
  return Event((transport) => {
    FromEvent<T>(
      $el,
      Of("keyup"),
      Of("addEventListener"),
      Of("removeEventListener"),
    ).event(transport);
  });
}
