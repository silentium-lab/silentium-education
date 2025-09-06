import { IncomingMessage } from "http";
import { From, InformationType, Lazy, Of, OfFunc, OwnerType, TheInformation } from "silentium";
import { Router, ToJson } from "silentium-components";
import { Query } from "../modules/string/Query";
import { notFoundSrc } from "../../store";
import { Db } from "mongodb";

export class CRUDRouter extends TheInformation<string> {
    public constructor(
        private req: InformationType<IncomingMessage>,
        private dbTransport: Lazy<Db>,
        private baseUrl: string
    ) {
        super(req, dbTransport);
    }

    public value(o: OwnerType<string>): this {
        new Router(
            new Query(this.req),
            new Of([
                {
                    pattern: `^GET:${this.baseUrl}$`,
                    template: new Lazy(() => new OfFunc((o) => {
                        this.dbTransport.get().value(new From(async (db) => {
                            const collection = db.collection('documents');
                            const all = await collection.find().toArray();
                            new ToJson(new Of({
                                message: 'ok',
                                data: all
                            })).value(o)
                        }))
                    })),
                },
                {
                    pattern: `^POST:${this.baseUrl}$`,
                    template: new Lazy(() => new ToJson(new Of({
                        message: 'created',
                        data: {}
                    }))),
                },
                {
                    pattern: `^PUT:${this.baseUrl}$`,
                    template: new Lazy(() => new ToJson(new Of({
                        message: 'updated',
                        data: {}
                    }))),
                },
                {
                    pattern: `^DELETE:${this.baseUrl}$`,
                    template: new Lazy(() => new ToJson(new Of({
                        message: 'removed',
                    }))),
                },
            ]) as InformationType,
            notFoundSrc as any,
        ).value(o);
        return this;
    }
}
