import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import { Message, MessageType } from "silentium";

/**
 * Convert incoming message body to json object
 */
export function RequestBody<T = any>(
  $req: MessageType<IncomingMessage>,
): MessageType<T> {
  return Message((res) => {
    $req.then(async function (req: IncomingMessage) {
      const body = await getRawBody(req);
      const bodyText = body.toString("utf8");
      res(JSON.parse(bodyText));
    });
  });
}
