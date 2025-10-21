import type { IncomingMessage } from "node:http";
import { Applied, EventType } from "silentium";

export function Query(req: EventType<IncomingMessage>): EventType<string> {
  return Applied(req, (r) => `${r.method}:${r.url}`);
}
