import { IncomingMessage } from "http";
import { UrlFromMessage } from "../string/UrlFromMessage";
import { UrlParams } from "../string/UrlParams";

/**
 * Request params from incoming message
 */
export function RequestParams(msg: IncomingMessage) {
  return UrlParams(UrlFromMessage(msg));
}
