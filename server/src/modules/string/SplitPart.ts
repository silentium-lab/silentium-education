import { all, applied, EventType, filtered } from "silentium";

export const splitPart = (
    baseSrc: EventType<string>,
    splitSrc: EventType<string>,
    indexSrc: EventType<number>
): EventType<string> => {
    return filtered(applied(all(
        baseSrc,
        splitSrc,
        indexSrc
        ), ([base, split, index]) => {
            const parts = base.split(split);
            return parts[index];
        }), r => r !== undefined)
}
