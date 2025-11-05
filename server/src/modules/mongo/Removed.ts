import { Db, ObjectId } from "mongodb";
import { Event, EventType, Of, Primitive, Transport } from "silentium";
import { UrlParam } from "../string/UrlParam";

export function Removed<T>(
  $db: EventType<Db>,
  $url: EventType<string>,
  collectionName: string,
): EventType<T> {
  return Event((transport) => {
    $db.event(
      Transport(async (db) => {
        try {
          const idSync = Primitive(UrlParam($url, Of("id")));
          const collection = db.collection(collectionName);
          const all = await collection.deleteOne({
            _id: new ObjectId(idSync.primitiveWithException()),
          });
          transport.use(all as T);
        } catch {
          throw new Error("Entity not found");
        }
      }),
    );
  });
}
