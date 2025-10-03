import { DataType, on, shared, SourceType } from "silentium";
import { first } from "silentium-components";
import { elements } from "silentium-web-api";
import { className } from "../modules/ClassName";
import { id } from "../modules/Id";
import { clicked } from "./Clicked";

export const clickedId = (clickSrc: SourceType<unknown>): DataType<string> => {
    return (u) => {
		const idSrc = shared(id());
        idSrc.value(u);

        const elSrc = shared(first(elements(className(idSrc.value))));

        on(clicked(elSrc.value), (e: Event) => {
            clickSrc.give(e);
		});
    }
}
