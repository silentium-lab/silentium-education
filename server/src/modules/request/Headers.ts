import { IncomingMessage } from "http";
import { Applied, MessageType } from "silentium";

export function Headers($req: MessageType<IncomingMessage>) {
  return Applied($req, (r) => r.headers);
}
