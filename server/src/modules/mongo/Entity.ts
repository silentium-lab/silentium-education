import { Db, ObjectId } from "mongodb";
import { EventType, Primitive } from "silentium";
import { UrlId } from "../string/UrlId";

export function Entity<T>(
    $db: EventType<Db>,
    $url: EventType<string>,
    collectionName: string
): EventType<T> {
    return (user) => {
        $db(async (db) => {
            try {
                const idSync = Primitive(
                    UrlId($url)
                );
                const collection = db.collection(collectionName);
                const one = await collection.findOne({
                    _id: new ObjectId(
                        idSync.primitiveWithException()
                    )
                });
                user(one as T);
            } catch {
                throw new Error('Entity not found');
            }
        });
    }
}
