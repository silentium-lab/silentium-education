import { All, From, On, OwnerType, Shared, SourceType, TheInformation } from "silentium";
import { Id } from "../modules/Id";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { KeyPressed } from "../modules/KeyPressed";

export class Input extends TheInformation<string> {
    public constructor(private valueSrc: SourceType<string>) {
        super(valueSrc);
    }

    public value(o: OwnerType<string>): this {
        const idSrc = new Shared(new Id());
        idSrc.value(o);

        const elSrc = new Shared(new First(new Elements(new ClassName(idSrc))));

        new All(elSrc, this.valueSrc).value(new From(([el, value]: [HTMLInputElement, string]) => {
            el.value = value;
        }));

        new On(new KeyPressed(elSrc), (e: InputEvent) => {
            this.valueSrc.give((e.target as HTMLInputElement).value);
        });

        return this;
    }
}
