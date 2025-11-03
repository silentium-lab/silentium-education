import { Db } from "mongodb";
import { Event, EventType, Transport } from "silentium";

export const settingsModels = {
  isConfigured(dbSrc: EventType<Db>): EventType<boolean> {
    return Event((transport) => {
      dbSrc.event(
        Transport(async (db) => {
          const collection = db.collection("settings");
          const all = await collection.find().toArray();
          transport.use(all.length > 0);
        }),
      );
    });
  },
};
