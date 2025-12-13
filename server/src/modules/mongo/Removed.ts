import { ObjectId } from "mongodb";
import { All, Applied, Context, MessageType, Of } from "silentium";
import { Path, Record } from "silentium-components";
import { UrlParam } from "../string/UrlParam";

export function Removed<T>($url: MessageType<string>, collection: string) {
  const $id = UrlParam($url, Of("id"));
  return Path<T>(
    Context<object>(
      Record({
        transport: "db",
        params: Record({
          method: "deleteOne",
          collection,
          args: All(
            Record({
              _id: Applied($id, (id) => new ObjectId(id)),
            }),
          ),
        }),
      }),
    ),
    "data",
  );
}
