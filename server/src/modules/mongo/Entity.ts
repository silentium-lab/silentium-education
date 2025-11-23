import { ObjectId } from "mongodb";
import { All, Applied, Context, Message, MessageType } from "silentium";
import { Record } from "silentium-components";
import { UrlId } from "../string/UrlId";

// TODO move $url outside
export function Entity<T>($url: MessageType<string>, collection: string) {
  return Message<T>((res, rej) => {
    const $id = UrlId($url);
    const rpc = Context<T>(
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
    rpc.then(res);
    rpc.catch(rej);
  });
}
