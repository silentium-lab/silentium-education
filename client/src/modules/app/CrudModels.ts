import { ConstructorType, EventType, of } from "silentium";
import { fromJson, path, recordOf, template } from "silentium-components";

class CrudModels {
    public constructor(
        private responsePathSrc: EventType<string>,
        private modelNameSrc: EventType<string> = of('any'),
    ) { }

    public ofModelName(modelNameSrc: EventType<string>) {
        return new CrudModels(
            this.responsePathSrc,
            modelNameSrc
        )
    }

    public list(
        modelTransport: ConstructorType<any, any>,
        searchSrc?: EventType<Record<string, unknown>>
    ) {
        return path<unknown[]>(fromJson(
            modelTransport(
                recordOf({
                    url: template(of('/$1'), recordOf({
                        $1: this.modelNameSrc
                    })).value,
                    method: of('GET'),
                    query: searchSrc ?? of({})
                })
            )
        ), this.responsePathSrc);
    }

    public entity(
        modelTransport: ConstructorType<any, any>,
        idSrc: EventType<string>
    ) {
        return path(fromJson(modelTransport(recordOf({
            url: template(of('/$1/$2/'), recordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })).value,
            method: of('GET'),
        }))), this.responsePathSrc);
    }

    public created(
        modelTransport: ConstructorType<any, any>,
        formSrc: EventType<string>
    ): EventType<Record<string, unknown>> {
        return path(fromJson(modelTransport(recordOf({
            url: template(of('/$1'), recordOf({
                $1: this.modelNameSrc
            })).value,
            method: of('POST'),
            body: formSrc,
        }))), this.responsePathSrc);
    }

    public updated(
        modelTransport: ConstructorType<any, any>,
        idSrc: EventType<string>,
        formSrc: EventType<string>
    ) {
        return path(fromJson(modelTransport(recordOf({
            url: template(of('/$1/$2/'), recordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })).value,
            method: of('PUT'),
            body: formSrc,
        }))), this.responsePathSrc);
    }

    public deleted(
        modelTransport: ConstructorType<any, any>,
        idSrc: EventType<string>
    ) {
        return path(fromJson(modelTransport(recordOf({
            url: template(of('/$1/$2/'), recordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })).value,
            method: of('DELETE'),
        }))), this.responsePathSrc);
    }
}

export const crudModels = (
    responsePathSrc: EventType<string>,
    modelNameSrc: EventType<string> = of('any'),
) => {
    return new CrudModels(responsePathSrc, modelNameSrc);
}
