import { EventType, of } from "silentium";
import { toJson } from "silentium-components";

export const settings = (): EventType<string> => {
  return toJson(
    of({
        message: "do Settings",
      }),
  );
}
