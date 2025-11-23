import { FromEvent, Message, MessageType, Of } from "silentium";

/**
 * DOM element keypress even
 */
export function KeyPressed<T extends Event>($el: MessageType<HTMLElement>) {
  return Message<T>((r) => {
    FromEvent<T>(
      $el,
      Of("keyup"),
      Of("addEventListener"),
      Of("removeEventListener"),
    ).then(r);
  });
}
