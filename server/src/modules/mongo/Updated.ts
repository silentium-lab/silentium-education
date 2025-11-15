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
  Transport,
  TransportOptional,
  TransportType,
} from "silentium";
import { Record } from "silentium-components";
import { UrlFromMessage } from "../string/UrlFromMessage";
import { UrlId } from "../string/UrlId";

export function Updated<T>(
  $req: MessageType<IncomingMessage>,
  collection: string,
  error?: TransportType,
) {
  return Message<T>((transport) => {
    const $id = UrlId(UrlFromMessage($req));

    $req.to(
      Transport(async (req) => {
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
          TransportOptional(error).wait(rpc.error());
          rpc.result().to(transport);
        } catch (e) {
          error?.use(e);
        }
      }),
    );
  });
}
