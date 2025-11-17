import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import { Message, MessageType, TapParent } from "silentium";

/**
 * Convert incoming message body to json object
 */
export function RequestBody<T = any>(
  $req: MessageType<IncomingMessage>,
): MessageType<T> {
  const parent = TapParent(async function (req: IncomingMessage) {
    const body = await getRawBody(req);
    const bodyText = body.toString("utf8");
    this.use(JSON.parse(bodyText));
  });
  return Message((transport) => {
    $req.pipe(parent.child(transport));
  });
}
