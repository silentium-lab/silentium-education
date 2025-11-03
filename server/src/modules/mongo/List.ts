import { Db } from "mongodb";
import { Event, EventType, Transport } from "silentium";

export function List<T>(
  $db: EventType<Db>,
  collectionName: string,
): EventType<T[]> {
  return Event((transport) => {
    $db.event(
      Transport(async (db) => {
        const collection = db.collection(collectionName);
        const all = await collection.find().toArray();
        transport.use(all as T[]);
      }),
    );
  });
}
