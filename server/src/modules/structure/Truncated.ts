import { Applied, MessageType } from "silentium";

/**
 * Allows forming an object where
 * values are excluded
 */
export function Truncated(
  $record: MessageType<Record<string, unknown>>,
  excludeValues: unknown[],
) {
  return Applied($record, (r) => {
    return Object.fromEntries(
      Object.entries(r).filter((e) => !excludeValues.includes(e[1])),
    );
  });
}
