import { EventType, Of } from "silentium";
import { ToJson } from "silentium-components";

export const Settings = (): EventType<string> => {
  return ToJson(
    Of({
        message: "do Settings",
      }),
  );
}
