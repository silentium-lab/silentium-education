import { EventType, Of } from "silentium";
import { ToJson } from "silentium-components";

export const Health = (): EventType<string> => {
  return ToJson(
      Of({
        time: Date.now(),
      }),
    );
}
