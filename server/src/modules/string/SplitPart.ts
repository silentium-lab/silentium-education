import { All, Applied, Filtered, InformationType, MaybeInformationType, MbInfo, OwnerType, TheInformation } from "silentium";

export class SplitPart extends TheInformation<string> {
    private baseSrc: InformationType<string>;
    private splitSrc: InformationType<string>;
    private indexSrc: InformationType<number>;

    public constructor(
        base: MaybeInformationType<string>,
        split: MaybeInformationType<string>,
        index: MaybeInformationType<number>
    ) {
        super();
        this.baseSrc = this.dep(new MbInfo(base));
        this.splitSrc = this.dep(new MbInfo(split));
        this.indexSrc = this.dep(new MbInfo(index));
    }

    value(o: OwnerType<string>): this {
        new Filtered(new Applied(new All(
            this.baseSrc,
            this.splitSrc,
            this.indexSrc
        ), ([base, split, index]) => {
            const parts = base.split(split);
            return parts[index];
        }), r => r !== undefined).value(o);
        return this;
    }
}
