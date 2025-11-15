import { All, Applied, Filtered, MessageType } from "silentium";

export function SplitPart(
  $base: MessageType<string>,
  $split: MessageType<string>,
  $index: MessageType<number>,
) {
  return Filtered(
    Applied(All($base, $split, $index), ([base, split, index]) => {
      const parts = base.trim().split(split).filter(Boolean);
      return parts.at(index) as string;
    }),
    (r) => r !== undefined,
  );
}
