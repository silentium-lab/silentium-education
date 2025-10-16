import { IncomingMessage } from "http";
import { Db } from "mongodb";
import getRawBody from "raw-body";
import { All, EventType } from "silentium";

export function Created<T>(
    $db: EventType<Db>,
    $req: EventType<IncomingMessage>,
    collectionName: string
): EventType<T> {
    return (user) => {
        All($db, $req)(async ([db, req]) => {
            try {
                const collection = db.collection(collectionName);
                const body = await getRawBody(req);
                const bodyText = body.toString('utf8');
                const result = await collection.insertOne(
                    JSON.parse(bodyText)
                )
                user(result as T);
            } catch {
                throw new Error('Entity not found');
            }
        });
    }
}
