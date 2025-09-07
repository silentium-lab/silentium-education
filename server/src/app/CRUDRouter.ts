import { IncomingMessage } from "http";
import { From, InformationType, Lazy, Of, OfFunc, OwnerType, TheInformation } from "silentium";
import { Path, Router, Sync, ToJson } from "silentium-components";
import { Query } from "../modules/string/Query";
import { notFoundSrc } from "../../store";
import { Db, ObjectId } from "mongodb";
import { SplitPart } from "../modules/string/SplitPart";
import getRawBody from 'raw-body';

export class CRUDRouter extends TheInformation<string> {
    public constructor(
        private req: InformationType<IncomingMessage>,
        private dbTransport: Lazy<Db>,
        private baseUrl: string,
        private collectionName: string
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
                            const collection = db.collection(this.collectionName);
                            const all = await collection.find().toArray();
                            new ToJson(new Of({
                                message: 'ok',
                                data: all
                            })).value(o)
                        }))
                    })),
                },
                {
                    pattern: `^GET:${this.baseUrl}/.+/$`,
                    template: new Lazy(() => new OfFunc((o) => {
                        this.dbTransport.get().value(new From(async (db) => {
                            try {
                                const idSync = new Sync(
                                    new SplitPart(
                                        new Path(this.req as InformationType, new Of('url')),
                                        "/",
                                        2
                                    )
                                );
                                const collection = db.collection(this.collectionName);
                                const all = await collection.findOne({ _id: new ObjectId(idSync.valueSync()) });
                                new ToJson(new Of({
                                    message: 'ok',
                                    data: all
                                })).value(o)
                            } catch {
                                new ToJson(new Of({
                                    message: 'unable to find entity'
                                })).value(o);
                            }
                        }))
                    })),
                },
                {
                    pattern: `^POST:${this.baseUrl}$`,
                    template: new Lazy(() => new OfFunc((o) => {
                        this.dbTransport.get().value(new From(async (db) => {
                            try {
                                const collection = db.collection(this.collectionName);
                                const reqSync = new Sync(this.req);
                                const body = await getRawBody(reqSync.valueSync());
                                const bodyText = body.toString('utf8');
                                const result = await collection.insertOne(
                                    JSON.parse(bodyText)
                                )
                                new ToJson(new Of({
                                    message: 'created',
                                    data: result
                                })).value(o);
                            } catch {
                                new ToJson(new Of({
                                    message: 'unable to create'
                                })).value(o);
                            }
                        }));
                    })),
                },
                {
                    pattern: `^PUT:${this.baseUrl}/.+/$`,
                    template: new Lazy(() => new OfFunc((o) => {
                        this.dbTransport.get().value(new From(async (db) => {
                            try {
                                const idSync = new Sync(
                                    new SplitPart(
                                        new Path(this.req as InformationType, new Of('url')),
                                        "/",
                                        2
                                    )
                                );
                                const collection = db.collection(this.collectionName);
                                const reqSync = new Sync(this.req);
                                const body = await getRawBody(reqSync.valueSync());
                                const bodyText = body.toString('utf8');
                                const all = await collection.findOneAndUpdate(
                                    { _id: new ObjectId(idSync.valueSync()) },
                                    { $set: JSON.parse(bodyText) },
                                    { returnDocument: 'after' }
                                );
                                new ToJson(new Of({
                                    message: 'ok',
                                    data: all
                                })).value(o)
                            } catch {
                                new ToJson(new Of({
                                    message: 'unable to find entity'
                                })).value(o);
                            }
                        }))
                    })),
                },
                {
                    pattern: `^DELETE:${this.baseUrl}/.+/$`,
                    template: new Lazy(() => new OfFunc((o) => {
                        this.dbTransport.get().value(new From(async (db) => {
                            try {
                                const idSync = new Sync(
                                    new SplitPart(
                                        new Path(this.req as InformationType, new Of('url')),
                                        "/",
                                        2
                                    )
                                );
                                const collection = db.collection(this.collectionName);
                                const all = await collection.deleteOne({ _id: new ObjectId(idSync.valueSync()) });
                                new ToJson(new Of({
                                    message: 'ok',
                                    data: all
                                })).value(o)
                            } catch {
                                new ToJson(new Of({
                                    message: 'unable to delete'
                                })).value(o);
                            }
                        }))
                    })),
                },
            ]) as InformationType,
            notFoundSrc as any,
        ).value(o);
        return this;
    }
}
