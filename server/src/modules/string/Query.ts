import type { IncomingMessage } from "node:http";
import {
  applied,
  EventType
} from "silentium";

export const query = (req: EventType<IncomingMessage>): EventType<string> => {
  return applied(req, (r) => `${r.method}:${r.url}`);
}
