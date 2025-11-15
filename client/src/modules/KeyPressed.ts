import { FromEvent, Message, MessageType, Of } from "silentium";

/**
 * DOM element keypress even
 */
export function KeyPressed<T extends Event>($el: MessageType<HTMLElement>) {
  return Message<T>((transport) => {
    FromEvent<T>(
      $el,
      Of("keyup"),
      Of("addEventListener"),
      Of("removeEventListener"),
    ).to(transport);
  });
}
