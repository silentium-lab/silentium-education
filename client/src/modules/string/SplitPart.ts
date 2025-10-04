import { all, applied, DataType, filtered } from "silentium";

export const splitPart = (
    baseSrc: DataType<string>,
    splitSrc: DataType<string>,
    indexSrc: DataType<number>
): DataType<string> => (user) => {
    filtered(applied(all(
        baseSrc,
        splitSrc,
        indexSrc
    ), ([base, split, index]) => {
        const parts = base.split(split);
        return parts[index];
    }), r => r !== undefined)(user);
}
