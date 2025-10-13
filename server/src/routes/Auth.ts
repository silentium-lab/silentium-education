import { EventType, Of } from "silentium";
import { ToJson } from "silentium-components";

export const Auth = (): EventType<string> => {
  return ToJson(
      Of({
        message: "do auth",
      }),
    );
}
