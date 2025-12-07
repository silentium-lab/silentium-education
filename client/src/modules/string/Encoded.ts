import { ActualMessage, Applied, MaybeMessage } from "silentium";

const escapeMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
} as const;

/**
 * String with html encoded
 */
export function Encoded(_base: MaybeMessage<string>) {
  const $base = ActualMessage(_base);
  return Applied($base, (b) =>
    b.replace(
      /[&<>"'/]/g,
      (match) => escapeMap[match as keyof typeof escapeMap],
    ),
  );
}
