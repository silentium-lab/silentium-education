import { All, From, InformationType, MaybeInformationType, MbInfo, OwnerType, TheInformation } from "silentium";
import MustacheTemplate from 'mustache';

export class Mustache extends TheInformation<string> {
    private templateSrc: InformationType<string>;

    public constructor(
        private template: MaybeInformationType<string>,
        private valuesSrc: InformationType<Record<string, unknown>>
    ) {
        super(valuesSrc);
        this.templateSrc = this.dep(new MbInfo(template));
    }

    public value(o: OwnerType<string>): this {
        new All(
            this.templateSrc,
            this.valuesSrc
        ).value(new From(([template, values]) => {
            o.give(
                MustacheTemplate.render(template, values),
            );
        }));
        return this;
    }
}
