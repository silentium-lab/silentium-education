import { IncomingMessage } from "http";
import { ObjectId } from "mongodb";
import getRawBody from "raw-body";
import { All, Applied, Context, Message, MessageType, Of } from "silentium";
import { Record } from "silentium-components";
import { UrlFromMessage } from "../string/UrlFromMessage";
import { UrlId } from "../string/UrlId";

export function Updated<T>(
  $req: MessageType<IncomingMessage>,
  collection: string,
) {
  return Message<T>((res, rej) => {
    const $id = UrlId(UrlFromMessage($req));

    $req.then(async (req) => {
      try {
        const body = await getRawBody(req);
        const bodyText = body.toString("utf8");
        const context = Context<T>(
          Record({
            transport: Of("db"),
            params: Record({
              method: Of("findOneAndUpdate"),
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
        context.then(res);
      } catch (e) {
        rej(e);
      }
    });
  });
}
