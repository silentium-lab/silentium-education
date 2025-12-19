import { MessageType } from "silentium";
import { FromJson, Path } from "silentium-components";

export function ServerAllResponse($base: MessageType<string>) {
  return FromJson($base);
}

/**
 * Base backend response
 * from data field
 */
export function ServerResponse($base: MessageType<string>) {
  return Path<any[]>(ServerAllResponse($base), "data");
}

/**
 * Backend response from meta field
 */
export function ServerMeta($base: MessageType<string>) {
  return Path<object>(ServerAllResponse($base), "meta");
}
