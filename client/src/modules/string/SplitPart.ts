import { All, Applied, Event, type EventType, Filtered } from "silentium";

export function SplitPart(
  $base: EventType<string>,
  $split: EventType<string>,
  $index: EventType<number>,
): EventType<string> {
  return Event((transport) => {
    Filtered(
      Applied(All($base, $split, $index), ([base, split, index]) => {
        const parts = base.split(split);
        return parts[index];
      }),
      (r) => r !== undefined,
    ).event(transport);
  });
}
