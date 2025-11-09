import { Applied, Event, EventType } from "silentium";

/**
 * Allows forming an object where
 * values are excluded
 */
export function Truncated(
  $record: EventType<Record<string, unknown>>,
  excludeValues: unknown[],
) {
  return Event((transport) => {
    Applied($record, (r) => {
      return Object.fromEntries(
        Object.entries(r).filter((e) => !excludeValues.includes(e[1])),
      );
    }).event(transport);
  });
}
