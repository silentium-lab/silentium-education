import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import { Event, EventType, TransportParent } from "silentium";

/**
 * Convert incoming message body to json object
 */
export function RequestBody<T = any>(
  $req: EventType<IncomingMessage>,
): EventType<T> {
  const parent = TransportParent(async function (req: IncomingMessage) {
    const body = await getRawBody(req);
    const bodyText = body.toString("utf8");
    this.use(JSON.parse(bodyText));
  });
  return Event((transport) => {
    $req.event(parent.child(transport));
  });
}
