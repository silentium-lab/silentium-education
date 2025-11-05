import { All, Applied, EventType, Filtered } from "silentium";

export function SplitPart(
  $base: EventType<string>,
  $split: EventType<string>,
  $index: EventType<number>,
): EventType<string> {
  return Filtered(
    Applied(All($base, $split, $index), ([base, split, index]) => {
      const parts = base.trim().split(split).filter(Boolean);
      return parts.at(index) as string;
    }),
    (r) => r !== undefined,
  );
}
