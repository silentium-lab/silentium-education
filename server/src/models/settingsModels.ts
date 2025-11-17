import { Applied, Message } from "silentium";
import { List } from "../modules/mongo/List";

export const settingsModels = {
  isConfigured() {
    return Message<boolean>((transport) => {
      Applied(List("user-passkeys"), (l) => l.length > 0).pipe(transport);
    });
  },
};
