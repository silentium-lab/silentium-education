import { All, Applied, Computed, Context, MessageType, Of } from "silentium";
import { Path, Record } from "silentium-components";
import { PagingRange } from "./PagingRange";
import { PagingSkip } from "./PagingSkip";

export function List<T>(
  collection: string,
  conditions: MessageType<any> = Of({}),
): MessageType<T[]> {
  return Path(ListWithMeta(collection, conditions), "data");
}

export function ListWithMeta<T>(
  collection: string,
  conditions: MessageType<any> = Of({}),
): MessageType<{ data: T[]; meta: unknown }> {
  return Context(
    Record({
      transport: "db",
      params: Record({
        method: "find",
        collection,
        args: All(PagingSkip(conditions)),
        postProcess: Applied(
          Computed(
            PagingRange,
            Applied(Path(conditions, "page", 1), Number),
            Applied(Path(conditions, "limit", 100), Number),
          ),
          (range) => [...range, ["toArray"]],
        ),
      }),
    }),
  );
}
