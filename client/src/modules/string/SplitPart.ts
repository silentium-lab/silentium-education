import { All, Applied, Filtered, Message, MessageType } from "silentium";

export function SplitPart(
  $base: MessageType<string>,
  $split: MessageType<string>,
  $index: MessageType<number>,
) {
  return Message<string>((transport) => {
    Filtered(
      Applied(All($base, $split, $index), ([base, split, index]) => {
        const parts = base.split(split);
        return parts[index];
      }),
      (r) => r !== undefined,
    ).pipe(transport);
  });
}
