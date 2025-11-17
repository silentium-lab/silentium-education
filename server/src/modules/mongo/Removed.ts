import { ObjectId } from "mongodb";
import {
  All,
  Applied,
  Message,
  MessageType,
  Of,
  RPC,
  TapOptional,
  TapType,
} from "silentium";
import { Record } from "silentium-components";
import { UrlParam } from "../string/UrlParam";

export function Removed<T>(
  $url: MessageType<string>,
  collection: string,
  error?: TapType,
) {
  return Message<T>((transport) => {
    const $id = UrlParam($url, Of("id"));
    const rpc = RPC(
      Record({
        transport: Of("db"),
        method: Of("deleteOne"),
        params: Record({
          collection: Of(collection),
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
