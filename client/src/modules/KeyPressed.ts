import { Event, type EventType, FromEvent, Of } from "silentium";

/**
 * DOM element keypress even
 */
export function KeyPressed<T extends Event>(
  elSrc: EventType<HTMLElement>,
): EventType<T> {
  return Event((transport) => {
    FromEvent<T>(
      elSrc,
      Of("keyup"),
      Of("addEventListener"),
      Of("removeEventListener"),
    ).event(transport);
  });
}
