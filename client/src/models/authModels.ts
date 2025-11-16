import { MessageType, Of } from "silentium";

export const authModels = {
  hasAuth(): MessageType<boolean> {
    return Of(true);
  },
};
