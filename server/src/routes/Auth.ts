import { EventType, Of } from "silentium";
import { ToJson } from "silentium-components";

export function Auth(): EventType<string> {
  return ToJson(
      Of({
        message: "do auth",
      }),
    );
}
