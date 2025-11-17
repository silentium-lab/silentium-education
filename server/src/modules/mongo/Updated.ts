import { IncomingMessage } from "http";
import { ObjectId } from "mongodb";
import getRawBody from "raw-body";
import {
  All,
  Applied,
  Message,
  MessageType,
  Of,
  RPC,
  Tap,
  TapOptional,
  TapType,
} from "silentium";
import { Record } from "silentium-components";
import { UrlFromMessage } from "../string/UrlFromMessage";
import { UrlId } from "../string/UrlId";

export function Updated<T>(
  $req: MessageType<IncomingMessage>,
  collection: string,
  error?: TapType,
) {
  return Message<T>((transport) => {
    const $id = UrlId(UrlFromMessage($req));

    $req.pipe(
      Tap(async (req) => {
        try {
          const body = await getRawBody(req);
          const bodyText = body.toString("utf8");
          const rpc = RPC(
            Record({
              transport: Of("db"),
              method: Of("findOneAndUpdate"),
              params: Record({
                collection: Of(collection),
                args: All(
                  Record({
                    _id: Applied($id, (id) => new ObjectId(id)),
                  }),
                  Of({ $set: JSON.parse(bodyText) }),
                  Of({ returnDocument: "after" }),
                ),
              }),
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
