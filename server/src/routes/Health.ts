import { EventType, Of } from "silentium";
import { ToJson } from "silentium-components";

export function Health(): EventType<string> {
  return ToJson(
    Of({
      time: Date.now(),
    }),
  );
}
