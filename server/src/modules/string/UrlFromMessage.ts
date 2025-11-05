import { IncomingMessage } from "http";
import { Applied, EventType } from "silentium";

export function UrlFromMessage(
  $msg: EventType<IncomingMessage>,
): EventType<string> {
  return Applied($msg, (msg) => `https://${msg.headers.host}${msg.url}`);
}
