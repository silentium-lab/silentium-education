import { EventType, of } from "silentium";
import { toJson } from "silentium-components";

export const auth = (): EventType<string> => {
  return toJson(
      of({
        message: "do auth",
      }),
    );
}
