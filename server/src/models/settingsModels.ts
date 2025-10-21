import { Db } from "mongodb";
import { EventType } from "silentium";

export const settingsModels = {
  isConfigured(dbSrc: EventType<Db>): EventType<boolean> {
    return (user) => {
      dbSrc(async (db) => {
        const collection = db.collection("settings");
        const all = await collection.find().toArray();
        user(all.length > 0);
      });
    };
  },
};
