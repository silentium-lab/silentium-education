import { EventType, Of } from "silentium";
import { ToJson } from "silentium-components";

export function Settings(): EventType<string> {
  return ToJson(
    Of({
        message: "do Settings",
      }),
  );
}
