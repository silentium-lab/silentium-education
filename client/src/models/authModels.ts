import { EventType, Of } from "silentium";

export const authModels = {
  hasAuth(): EventType<boolean> {
    return Of(true);
  },
};
