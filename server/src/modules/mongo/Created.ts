import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import { Context, Message, MessageType } from "silentium";

export function Created<T>(
  $req: MessageType<IncomingMessage>,
  collection: string,
) {
  return Message<T>((res, rej) => {
    $req.then(async (req) => {
      try {
        const body = await getRawBody(req);
        const bodyText = body.toString("utf8");
        const rpc = Context<T>({
          transport: "db",
          params: {
            method: "insertOne",
            collection,
            args: [JSON.parse(bodyText)],
          },
        });
        rpc.then(res);
        rpc.catch(rej);
      } catch (e) {
        rej(e);
      }
    });
  });
}
