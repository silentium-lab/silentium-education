import { EventType, of } from "silentium";
import { toJson } from "silentium-components";

export const health = (): EventType<string> => {
  return toJson(
      of({
        time: Date.now(),
      }),
    );
}
