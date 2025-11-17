import { Applied, Message, MessageType } from "silentium";

/**
 * Allows forming an object where
 * values are excluded
 */
export function Truncated(
  $record: MessageType<Record<string, unknown>>,
  excludeValues: unknown[],
) {
  return Message((transport) => {
    Applied($record, (r) => {
      return Object.fromEntries(
        Object.entries(r).filter((e) => !excludeValues.includes(e[1])),
      );
    }).pipe(transport);
  });
}
