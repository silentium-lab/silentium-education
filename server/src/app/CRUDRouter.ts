import { IncomingMessage } from "http";
import { Db, ObjectId } from "mongodb";
import getRawBody from 'raw-body';
import { ConstructorType, EventType, of, primitive } from "silentium";
import { detached, path, router, toJson } from "silentium-components";
import { notFoundSrc } from "../../store";
import { query } from "../modules/string/Query";
import { splitPart } from "../modules/string/SplitPart";

export const CRUDRouter = (
    req: EventType<IncomingMessage>,
    dbTransport: ConstructorType<[], EventType<Db>>,
    baseUrl: string,
    collectionName: string
): EventType<string> => {
    const detachedReq = detached<any>(req);
    return router<string>(
            query(detachedReq),
            of([
                {
                    pattern: `^GET:${baseUrl}$`,
                    template: (): EventType<string> => (o) => {
                        dbTransport()(async (db) => {
                            const collection = db.collection(collectionName);
                            const all = await collection.find().toArray();
                            toJson(of({
                                message: 'ok',
                                data: all
                            }))(o)
                        })
                    },
                },
                {
                    pattern: `^GET:${baseUrl}/.+/$`,
                    template: (): EventType<string> => (o) => {
                        dbTransport()(async (db) => {
                            try {
                                const idSync = primitive(
                                    splitPart(
                                        path(detachedReq as EventType<any>, of('url')),
                                        of("/"),
                                        of(2)
                                    )
                                );
                                const collection = db.collection(collectionName);
                                const all = await collection.findOne({
                                    _id: new ObjectId(
                                        idSync.primitiveWithException()
                                    )
                                });
                                toJson(of({
                                    message: 'ok',
                                    data: all
                                }))(o)
                            } catch {
                                toJson(of({
                                    message: 'unable to find entity'
                                }))(o);
                            }
                        })
                    },
                },
                {
                    pattern: `^POST:${baseUrl}$`,
                    template: (): EventType<string> => (o) => {
                        dbTransport()(async (db) => {
                            try {
                                const collection = db.collection(collectionName);
                                const reqSync = primitive(detachedReq);
                                const body = await getRawBody(reqSync.primitiveWithException());
                                const bodyText = body.toString('utf8');
                                const result = await collection.insertOne(
                                    JSON.parse(bodyText)
                                )
                                toJson(of({
                                    message: 'created',
                                    data: result
                                }))(o);
                            } catch {
                                toJson(of({
                                    message: 'unable to create'
                                }))(o);
                            }
                        });
                    },
                },
                {
                    pattern: `^PUT:${baseUrl}/.+/$`,
                    template: (): EventType<string> => (o) => {
                        dbTransport()(async (db) => {
                            try {
                                const idSync = primitive(
                                    splitPart(
                                        path(detachedReq, of('url')),
                                        of("/"),
                                        of(2)
                                    )
                                );
                                const collection = db.collection(collectionName);
                                const reqSync = primitive(detachedReq);
                                const body = await getRawBody(reqSync.primitiveWithException());
                                const bodyText = body.toString('utf8');
                                const all = await collection.findOneAndUpdate(
                                    { _id: new ObjectId(idSync.primitiveWithException()) },
                                    { $set: JSON.parse(bodyText) },
                                    { returnDocument: 'after' }
                                );
                                toJson(of({
                                    message: 'ok',
                                    data: all
                                }))(o)
                            } catch {
                                toJson(of({
                                    message: 'unable to find entity'
                                }))(o);
                            }
                        })
                    },
                },
                {
                    pattern: `^DELETE:${baseUrl}/.+/$`,
                    template: (): EventType<string> => (o) => {
                        dbTransport()(async (db) => {
                            try {
                                const idSync = primitive(
                                    splitPart(
                                        path(detachedReq, of('url')),
                                        of("/"),
                                        of(2)
                                    )
                                );
                                const collection = db.collection(collectionName);
                                const all = await collection.deleteOne({ _id: new ObjectId(idSync.primitiveWithException()) });
                                toJson(of({
                                    message: 'ok',
                                    data: all
                                }))(o)
                            } catch {
                                toJson(of({
                                    message: 'unable to delete'
                                }))(o);
                            }
                        })
                    },
                },
            ]),
            notFoundSrc,
        );
}
