import { Db, ObjectId } from "mongodb";
import { Event, EventType, Primitive, Transport } from "silentium";
import { UrlId } from "../string/UrlId";

export function Entity<T>(
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
          const one = await collection.findOne({
            _id: new ObjectId(idSync.primitiveWithException()),
          });
          transport.use(one as T);
        } catch (e: unknown) {
          throw new Error("Entity not found", { cause: e });
        }
      }),
    );
  });
}
