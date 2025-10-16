import { All, Applied, EventType, Filtered } from "silentium";

export const SplitPart = (
    $base: EventType<string>,
    $split: EventType<string>,
    $index: EventType<number>
): EventType<string> => {
    return Filtered(Applied(All(
        $base,
        $split,
        $index
        ), ([base, split, index]) => {
            const parts = base.split(split);
            return parts.at(index) as string;
        }), r => r !== undefined)
}
