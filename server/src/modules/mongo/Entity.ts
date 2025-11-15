import { ObjectId } from "mongodb";
import {
  All,
  Applied,
  Message,
  MessageType,
  RPC,
  TransportOptional,
  TransportType,
} from "silentium";
import { Record } from "silentium-components";
import { UrlId } from "../string/UrlId";

// TODO move $url outside
export function Entity<T>(
  $url: MessageType<string>,
  collection: string,
  error?: TransportType,
) {
  return Message<T>((transport) => {
    const $id = UrlId($url);
    const rpc = RPC(
      Record({
        transport: "db",
        method: "findOne",
        params: Record({
          collection,
          args: All(
            Record({
              _id: Applied($id, (id) => new ObjectId(id)),
            }),
          ),
        }),
      }),
    );
    TransportOptional(error).wait(rpc.error());
    rpc.result().to(transport);
  });
}
