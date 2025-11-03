import { IncomingMessage } from "http";
import { Db, ObjectId } from "mongodb";
import { All, Event, EventType, Primitive, Transport } from "silentium";
import { UrlId } from "../string/UrlId";
import { UrlFromMessage } from "../string/UrlFromMessage";
import getRawBody from "raw-body";

export function Updated<T>(
  $db: EventType<Db>,
  $req: EventType<IncomingMessage>,
  collectionName: string,
): EventType<T> {
  return Event((transport) => {
    All($db, $req).event(
      Transport(async ([db, req]) => {
        try {
          const idSync = Primitive(UrlId(UrlFromMessage($req)));
          const collection = db.collection(collectionName);
          const body = await getRawBody(req);
          const bodyText = body.toString("utf8");
          const one = await collection.findOneAndUpdate(
            { _id: new ObjectId(idSync.primitiveWithException()) },
            { $set: JSON.parse(bodyText) },
            { returnDocument: "after" },
          );
          transport.use(one as T);
        } catch {
          throw new Error("Entity not found");
        }
      }),
    );
  });
}
