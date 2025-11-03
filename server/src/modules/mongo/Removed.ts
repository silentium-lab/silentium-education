import { Db, ObjectId } from "mongodb";
import { Event, EventType, Primitive, Transport } from "silentium";
import { UrlId } from "../string/UrlId";

export function Removed<T>(
  $db: EventType<Db>,
  $url: EventType<string>,
  collectionName: string,
): EventType<T> {
  return Event((transport) => {
    $db.event(
      Transport(async (db) => {
        try {
          const idSync = Primitive(UrlId($url));
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
