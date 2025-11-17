import { ObjectId } from "mongodb";
import {
  All,
  Applied,
  Message,
  MessageType,
  RPC,
  TapOptional,
  TapType,
} from "silentium";
import { Record } from "silentium-components";
import { UrlId } from "../string/UrlId";

// TODO move $url outside
export function Entity<T>(
  $url: MessageType<string>,
  collection: string,
  error?: TapType,
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
    TapOptional(error).wait(rpc.error());
    rpc.result().pipe(transport);
  });
}
