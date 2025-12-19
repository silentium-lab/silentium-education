import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import { Context, Message, MessageType } from "silentium";
import { Path } from "silentium-components";

export function Created<T>(
  $req: MessageType<IncomingMessage>,
  collection: string,
) {
  return Message<T>((res, rej) => {
    $req.then(async (req) => {
      try {
        const body = await getRawBody(req);
        const bodyText = body.toString("utf8");
        const rpc = Path<T>(
          Context<object>("db", {
            method: "insertOne",
            collection,
            args: [JSON.parse(bodyText)],
          }),
          "data",
        );
        rpc.then(res);
        rpc.catch(rej);
      } catch (e) {
        rej(e);
      }
    });
  });
}
