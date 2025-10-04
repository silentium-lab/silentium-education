import { all, DataType, on, shared, SourceType } from "silentium";
import { first } from "silentium-components";
import { elements } from "silentium-web-api";
import { className } from "../modules/ClassName";
import { id } from "../modules/Id";
import { keyPressed } from "../modules/KeyPressed";

export const input = (valueSrc: SourceType<string>): DataType<string> => (user) => {
    const idSrc = shared(id());
    idSrc.value(user);

    const elSrc = shared(first(elements<HTMLInputElement>(className(idSrc.value))));

    all(elSrc.value, valueSrc.value)(([el, value]) => {
        if (el) {
            el.value = value;
        }
    });

    on(keyPressed<InputEvent>(elSrc.value), (e: InputEvent) => {
        valueSrc.give((e.target as HTMLInputElement).value);
    });
}
