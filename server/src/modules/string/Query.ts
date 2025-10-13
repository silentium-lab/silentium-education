import type { IncomingMessage } from "node:http";
import {
  Applied,
  EventType
} from "silentium";

export const Query = (req: EventType<IncomingMessage>): EventType<string> => {
  return Applied(req, (r) => `${r.method}:${r.url}`);
}
