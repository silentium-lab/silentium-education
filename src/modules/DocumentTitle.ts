import { InformationType, Late, OwnerType, TheInformation } from "silentium";

export class DocumentTitle extends TheInformation<string> implements OwnerType<string> {
    private src = new Late(document.title);

    value(o: OwnerType<string>): this {
        this.src.value(o);
        return this;
    }

    give(value: string): this {
        this.src.give(value);
        document.title = value;
        return this;
    }
}
