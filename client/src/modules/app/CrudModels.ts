import { DataType, of, ValueType } from "silentium";
import { fromJson, path, recordOf, template } from "silentium-components";

class CrudModels {
    public constructor(
        private modelTransport: ValueType<[any], any>,
        private responsePathSrc: DataType<string>,
        private modelNameSrc: DataType<string> = of('any'),
    ) { }

    public ofModelName(modelNameSrc: DataType<string>) {
        return new CrudModels(
            this.modelTransport,
            this.responsePathSrc,
            modelNameSrc
        )
    }

    public list(searchSrc?: DataType<Record<string, unknown>>) {
        return path<unknown[]>(fromJson(
            this.modelTransport(
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

    public entity(idSrc: DataType<string>) {
        return path(fromJson(this.modelTransport(recordOf({
            url: template(of('/$1/$2/'), recordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })).value,
            method: of('GET'),
        }))), this.responsePathSrc);
    }

    public created(formSrc: DataType<string>): DataType<Record<string, unknown>> {
        return path(fromJson(this.modelTransport(recordOf({
            url: template(of('/$1'), recordOf({
                $1: this.modelNameSrc
            })).value,
            method: of('POST'),
            body: formSrc,
        }))), this.responsePathSrc);
    }

    public updated(idSrc: DataType<string>, formSrc: DataType<string>) {
        return path(fromJson(this.modelTransport(recordOf({
            url: template(of('/$1/$2/'), recordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })).value,
            method: of('PUT'),
            body: formSrc,
        }))), this.responsePathSrc);
    }

    public deleted(idSrc: DataType<string>) {
        return path(fromJson(this.modelTransport(recordOf({
            url: template(of('/$1/$2/'), recordOf({
                $1: this.modelNameSrc,
                $2: idSrc
            })).value,
            method: of('DELETE'),
        }))), this.responsePathSrc);
    }
}

export const crudModels = (
    modelTransport: ValueType,
    responsePathSrc: DataType<string>,
    modelNameSrc: DataType<string> = of('any'),
) => {
    return new CrudModels(modelTransport, responsePathSrc, modelNameSrc);
}
