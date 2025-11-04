import { EventType, Of } from "silentium";
import { FromJson, Path } from "silentium-components";

/**
 * Base backend format
 */
export function ServerResponse($base: EventType<string>) {
  return Path(FromJson($base), Of("data"));
}
