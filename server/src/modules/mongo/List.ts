import { All, Context, Message, MessageType } from "silentium";
import { Record } from "silentium-components";

export function List<T>(
  collection: string,
  conditions?: MessageType,
): MessageType<T[]> {
  return Message((res, rej) => {
    const context = Context<T[]>(
      Record({
        transport: "db",
        params: Record({
          method: "find",
          collection,
          args: conditions ? All(conditions) : [],
          postProcess: "toArray",
        }),
      }),
    );
    context.then(res);
    context.catch(rej);
  });
}
