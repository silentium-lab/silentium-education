import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import {
  Message,
  MessageType,
  Of,
  RPC,
  Transport,
  TransportOptional,
  TransportType,
} from "silentium";

export function Created<T>(
  $req: MessageType<IncomingMessage>,
  collection: string,
  error?: TransportType,
) {
  return Message<T>((transport) => {
    $req.to(
      Transport(async (req) => {
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
          TransportOptional(error).wait(rpc.error());
          rpc.result().to(transport);
        } catch (e) {
          error?.use(e);
        }
      }),
    );
  });
}
