import { InformationType, MaybeInformationType, MbInfo, Of } from "silentium";
import { FromJson, Path, RecordOf, Template } from "silentium-components";

export class CrudModels {
    public constructor(
        private modelTransport,
        private responsePathSrc: InformationType<string>,
        private modelNameSrc: InformationType<string> = new Of('any'),
    ) { }

    public ofModelName(modelNameSrc: MaybeInformationType<string>) {
        return new CrudModels(
            this.modelTransport,
            this.responsePathSrc,
            new MbInfo(modelNameSrc)
        )
    }

    public list(searchSrc?: InformationType<Record<string, unknown>>) {
        return new Path(new FromJson(this.modelTransport.get(new RecordOf({
            url: new Template('/$1', new RecordOf({
                $1: this.modelNameSrc
            })),
            method: new Of('GET'),
            query: searchSrc ?? new Of({})
        }))), this.responsePathSrc);
    }

    public entity(idSrc: InformationType<string>) {
        return new Path(new FromJson(this.modelTransport.get(new RecordOf({
            url: new Template('/$1/$2/', new RecordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })),
            method: new Of('GET'),
        }))), this.responsePathSrc);
    }

    public created(formSrc: InformationType<Record<string, unknown>>) {
        return new Path(new FromJson(this.modelTransport.get(new RecordOf({
            url: new Template('/$1', new RecordOf({
                $1: this.modelNameSrc
            })),
            method: new Of('POST'),
            body: formSrc,
        }))), this.responsePathSrc);
    }

    public updated(idSrc: InformationType<string>, formSrc: InformationType<Record<string, unknown>>) {
        return new Path(new FromJson(this.modelTransport.get(new RecordOf({
            url: new Template('/$1/$2/', new RecordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })),
            method: new Of('PUT'),
            body: formSrc,
        }))), this.responsePathSrc);
     }

    public deleted(idSrc: InformationType<string>) {
        return new Path(new FromJson(this.modelTransport.get(new RecordOf({
            url: new Template('/$1/$2/', new RecordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })),
            method: new Of('DELETE'),
        }))), this.responsePathSrc);
     }
}
