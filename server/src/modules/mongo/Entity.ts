import { ObjectId } from "mongodb";
import { All, Applied, Context, Message, MessageType } from "silentium";
import { Path, Record } from "silentium-components";
import { UrlId } from "../string/UrlId";

// TODO move $url outside
export function Entity<T>($url: MessageType<string>, collection: string) {
  return Message<T>((res, rej) => {
    const $id = UrlId($url);
    const rpc = Path<T>(
      Context<object>(
        "db",
        Record({
          method: "findOne",
          collection,
          args: All(
            Record({
              _id: Applied($id, (id) => new ObjectId(id)),
            }),
          ),
        }),
      ),
      "data",
    );
    rpc.then(res);
    rpc.catch(rej);
  });
}
