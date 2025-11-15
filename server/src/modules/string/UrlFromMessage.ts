import { IncomingMessage } from "http";
import { Applied, MessageType } from "silentium";

export function UrlFromMessage($msg: MessageType<IncomingMessage>) {
  return Applied($msg, (msg) => `https://${msg.headers.host}${msg.url}`);
}
