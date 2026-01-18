import { CRUDTransport } from "@/modules/app/crud/CRUDTransport";
import { NewContext } from "@/modules/context/Context";
import { Actual, Context, MaybeMessage, MessageType } from "silentium";
import { Record } from "silentium-components";

export function CRUDCustom<R = unknown>(
  model: MaybeMessage<string>,
  $search?: MessageType<Record<string, unknown>>,
) {
  const $model = Actual(model);
  return Context<R>(
    CRUDTransport(),
    Record({
      method: "get",
      model: $model,
      query: $search ?? {},
      credentials: "include",
    }),
  ).catch(NewContext("error"));
}
