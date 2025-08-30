import { Applied, Destroyable, InformationType, TheInformation } from "silentium";
import translations from '../data/translations.json';

export class I18n extends Destroyable {
    public constructor(private langSrc: InformationType<string>) {
        super(langSrc);
    }

    public tr(field: string) {
        return new Applied(this.langSrc, (l) => {
            return translations[l][field];
        })
    }
}
