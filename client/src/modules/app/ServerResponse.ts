import { MessageType, Of } from "silentium";
import { FromJson, Path } from "silentium-components";

/**
 * Base backend format
 */
export function ServerResponse($base: MessageType<string>) {
  return Path<any>(FromJson($base), Of("data"));
}
