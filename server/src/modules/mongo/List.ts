import { Db } from "mongodb";
import { EventType } from "silentium";

export function List<T>(
  $db: EventType<Db>,
  collectionName: string,
): EventType<T[]> {
  return (user) => {
    $db(async (db) => {
      const collection = db.collection(collectionName);
      const all = await collection.find().toArray();
      user(all as T[]);
    });
  };
}
