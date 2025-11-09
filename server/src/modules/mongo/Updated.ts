import { IncomingMessage } from "http";
import { ObjectId } from "mongodb";
import getRawBody from "raw-body";
import {
  All,
  Applied,
  Event,
  EventType,
  Of,
  RPC,
  Transport,
  TransportOptional,
  TransportType,
} from "silentium";
import { RecordOf } from "silentium-components";
import { UrlFromMessage } from "../string/UrlFromMessage";
import { UrlId } from "../string/UrlId";

export function Updated<T>(
  $req: EventType<IncomingMessage>,
  collection: string,
  error?: TransportType,
): EventType<T> {
  return Event((transport) => {
    const $id = UrlId(UrlFromMessage($req));

    $req.event(
      Transport(async (req) => {
        try {
          const body = await getRawBody(req);
          const bodyText = body.toString("utf8");
          const rpc = RPC(
            RecordOf({
              transport: Of("db"),
              method: Of("findOneAndUpdate"),
              params: RecordOf({
                collection: Of(collection),
                args: All(
                  RecordOf({
                    _id: Applied($id, (id) => new ObjectId(id)),
                  }),
                  Of({ $set: JSON.parse(bodyText) }),
                  Of({ returnDocument: "after" }),
                ),
              }),
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
