import {
  All,
  Applied,
  Computed,
  Context,
  Message,
  MessageType,
  Of,
} from "silentium";
import { Path, Record } from "silentium-components";
import { PagingRange } from "./PagingRange";
import { PagingSkip } from "./PagingSkip";

export function List<T>(
  collection: string,
  conditions: MessageType<any> = Of({}),
): MessageType<T[]> {
  return Message((res, rej) => {
    const context = Context<T[]>(
      Record({
        transport: "db",
        params: Record({
          method: "find",
          collection,
          args: All(PagingSkip(conditions)),
          postProcess: Applied(
            Computed(
              PagingRange,
              Path(conditions, "page", 1),
              Path(conditions, "limit", 100),
            ),
            (range) => [...range, ["toArray"]],
          ),
        }),
      }),
    );
    context.then(res);
    context.catch(rej);
  });
}
