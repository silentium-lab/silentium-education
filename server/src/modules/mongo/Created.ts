import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import {
  Message,
  MessageType,
  Of,
  RPC,
  Tap,
  TapOptional,
  TapType,
} from "silentium";

export function Created<T>(
  $req: MessageType<IncomingMessage>,
  collection: string,
  error?: TapType,
) {
  return Message<T>((transport) => {
    $req.pipe(
      Tap(async (req) => {
        try {
          const body = await getRawBody(req);
          const bodyText = body.toString("utf8");
          const rpc = RPC(
            Of({
              transport: "db",
              method: "insertOne",
              params: {
                collection,
                args: [JSON.parse(bodyText)],
              },
            }),
          );
          TapOptional(error).wait(rpc.error());
          rpc.result().pipe(transport);
        } catch (e) {
          error?.use(e);
        }
      }),
    );
  });
}
