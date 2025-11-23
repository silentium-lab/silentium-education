import { ObjectId } from "mongodb";
import { All, Applied, Context, Message, MessageType, Of } from "silentium";
import { Record } from "silentium-components";
import { UrlParam } from "../string/UrlParam";

export function Removed<T>($url: MessageType<string>, collection: string) {
  return Message<T>((res, rej) => {
    const $id = UrlParam($url, Of("id"));
    const context = Context<T>(
      Record({
        transport: "db",
        method: "deleteOne",
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
    context.then(res);
    context.catch(rej);
  });
}
