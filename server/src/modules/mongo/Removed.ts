import { ObjectId } from "mongodb";
import {
  All,
  Applied,
  Event,
  EventType,
  Of,
  RPC,
  TransportOptional,
  TransportType,
} from "silentium";
import { RecordOf } from "silentium-components";
import { UrlParam } from "../string/UrlParam";

export function Removed<T>(
  $url: EventType<string>,
  collection: string,
  error?: TransportType,
): EventType<T> {
  return Event((transport) => {
    const $id = UrlParam($url, Of("id"));
    const rpc = RPC(
      RecordOf({
        transport: Of("db"),
        method: Of("deleteOne"),
        params: RecordOf({
          collection: Of(collection),
          args: All(
            RecordOf({
              _id: Applied($id, (id) => new ObjectId(id)),
            }),
          ),
        }),
      }),
    );
    TransportOptional(error).wait(rpc.error());
    rpc.result().event(transport);
  });
}
