import { On, OwnerType, Shared, SourceType, TheInformation } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Id } from "../modules/Id";
import { Clicked } from "./Clicked";

export class ClickedId extends TheInformation<string> {
    public constructor(private clickSrc: SourceType<unknown>) {
        super(clickSrc);
    }

    public value(o: OwnerType<string>): this {
		const idSrc = new Shared(new Id());
        idSrc.value(o);

        const elSrc = new Shared(new First(new Elements(new ClassName(idSrc))));

        new On(this.dep(new Clicked(elSrc)), (e: InputEvent) => {
            this.clickSrc.give(e);
		});

        return this;
    }
}
