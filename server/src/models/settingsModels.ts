import { Applied, Event, EventType } from "silentium";
import { List } from "../modules/mongo/List";

export const settingsModels = {
  isConfigured(): EventType<boolean> {
    return Event((transport) => {
      Applied(List("settings"), (l) => l.length > 0).event(transport);
    });
  },
};
