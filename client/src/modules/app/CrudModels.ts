import { type EventType, Of, RPC, TransportType } from "silentium";
import {
  Concatenated,
  FromJson,
  Path,
  RecordOf,
  Template,
} from "silentium-components";

class ModuleCrudModels {
  public constructor(
    private responsePathSrc: EventType<string>,
    private modelNameSrc: EventType<string> = Of("any"),
  ) {}

  public ofModelName(modelNameSrc: EventType<string>) {
    return new ModuleCrudModels(this.responsePathSrc, modelNameSrc);
  }

  public custom<T>(
    modelTransport: TransportType<any, any>,
    searchSrc: EventType<Record<string, unknown>> = Of({}),
  ) {
    return Path<T>(
      FromJson(
        modelTransport.use(
          RecordOf({
            url: Template(
              Of("/$1"),
              RecordOf({
                $1: this.modelNameSrc,
              }),
            ),
            method: Of("GET"),
            query: searchSrc ?? Of({}),
          }),
        ),
      ),
      this.responsePathSrc,
    );
  }

  public list(
    modelTransport: TransportType<any, any>,
    searchSrc?: EventType<Record<string, unknown>>,
  ) {
    return Path<unknown[]>(
      FromJson(
        modelTransport.use(
          RecordOf({
            url: Template(
              Of("/$1"),
              RecordOf({
                $1: this.modelNameSrc,
              }),
            ),
            method: Of("GET"),
            query: searchSrc ?? Of({}),
          }),
        ),
      ),
      this.responsePathSrc,
    );
  }

  public entity(
    modelTransport: TransportType<any, any>,
    idSrc: EventType<string>,
  ) {
    return Path(
      FromJson(
        modelTransport.use(
          RecordOf({
            url: Template(
              Of("/$1/$2/"),
              RecordOf({
                $1: this.modelNameSrc,
                $2: idSrc,
              }),
            ),
            method: Of("GET"),
          }),
        ),
      ),
      this.responsePathSrc,
    );
  }

  public created(formSrc: EventType) {
    return RPC(
      RecordOf({
        transport: Of("request"),
        method: Concatenated([Of("post."), this.modelNameSrc]),
        params: RecordOf({
          body: formSrc,
        }),
      }),
    );
  }

  public updated(
    modelTransport: TransportType<any, any>,
    idSrc: EventType<string>,
    formSrc: EventType<string>,
  ) {
    return Path(
      FromJson(
        modelTransport.use(
          RecordOf({
            url: Template(
              Of("/$1/$2/"),
              RecordOf({
                $1: this.modelNameSrc,
                $2: idSrc,
              }),
            ),
            method: Of("PUT"),
            body: formSrc,
          }),
        ),
      ),
      this.responsePathSrc,
    );
  }

  public deleted(
    modelTransport: TransportType<any, any>,
    idSrc: EventType<string>,
  ) {
    return Path(
      FromJson(
        modelTransport.use(
          RecordOf({
            url: Template(
              Of("/$1/$2/"),
              RecordOf({
                $1: this.modelNameSrc,
                $2: idSrc,
              }),
            ),
            method: Of("DELETE"),
          }),
        ),
      ),
      this.responsePathSrc,
    );
  }
}

export function CrudModels(
  responsePathSrc: EventType<string>,
  modelNameSrc: EventType<string> = Of("any"),
) {
  return new ModuleCrudModels(responsePathSrc, modelNameSrc);
}
