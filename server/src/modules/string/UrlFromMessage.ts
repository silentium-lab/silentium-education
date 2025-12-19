import { IncomingMessage } from "http";

export function UrlFromMessage(msg: IncomingMessage) {
  return `https://${msg.headers.host}${msg.url}`;
}
