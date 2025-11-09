import { ObjectId } from "mongodb";
import {
  Applied,
  Event,
  EventType,
  Of,
  RPC,
  TransportOptional,
  TransportType,
} from "silentium";
import { RecordOf } from "silentium-components";
import { UrlId } from "../string/UrlId";

export function Removed<T>(
  $url: EventType<string>,
  collection: string,
  error?: TransportType,
): EventType<T> {
  return Event((transport) => {
    const $id = UrlId($url);
    const rpc = RPC(
      RecordOf({
        transport: Of("db"),
        method: Of("deleteOne"),
        params: RecordOf({
          collection: Of(collection),
          args: RecordOf({
            _id: Applied($id, (id) => new ObjectId(id)),
          }),
        }),
      }),
    );
    TransportOptional(error).wait(rpc.error());
    rpc.result().event(transport);
  });
}
