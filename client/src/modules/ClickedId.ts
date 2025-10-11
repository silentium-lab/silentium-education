import { EventType, on, shared, SourceType } from "silentium";
import { first } from "silentium-components";
import { elements } from "silentium-web-api";
import { className } from "../modules/ClassName";
import { id } from "../modules/Id";
import { clicked } from "./Clicked";

export const clickedId = (clickSrc: SourceType<unknown>): EventType<string> => {
    return (u) => {
		const idSrc = shared(id());
        idSrc.event(u);

        const elSrc = shared(first(elements(className(idSrc.event))));

        on(clicked(elSrc.event), clickSrc.use);
    }
}
