import { IncomingMessage } from "http";
import getRawBody from "raw-body";
import {
  Event,
  EventType,
  Of,
  RPC,
  Transport,
  TransportOptional,
  TransportType,
} from "silentium";

export function Created<T>(
  $req: EventType<IncomingMessage>,
  collection: string,
  error?: TransportType,
): EventType<T> {
  return Event((transport) => {
    $req.event(
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
          rpc.result().event(transport);
        } catch (e) {
          error?.use(e);
        }
      }),
    );
  });
}
