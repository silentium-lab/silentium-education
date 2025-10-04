import MustacheTemplate from 'mustache';
import { all, DataType } from "silentium";

export const mustache = (
    templateSrc: DataType<string>,
    valuesSrc: DataType<Record<string, unknown>>
): DataType<string> => (user) => {
    all(
        templateSrc,
        valuesSrc
    )(([template, values]) => {
        user(
            MustacheTemplate.render(template, values),
        );
    });
}
