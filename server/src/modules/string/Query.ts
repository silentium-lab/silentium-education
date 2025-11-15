import type { IncomingMessage } from "node:http";
import { Applied, MessageType } from "silentium";

export function Query(req: MessageType<IncomingMessage>) {
  return Applied(req, (r) => `${r.method}:${r.url}`);
}
