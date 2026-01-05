import { CRUDTransport } from "@/modules/app/crud/CRUDTransport";
import { NewContext } from "@/modules/context/Context";
import { ActualMessage, Context, MaybeMessage, MessageType } from "silentium";
import { Record } from "silentium-components";

export function CRUDDeleted<R = unknown>(
  model: MaybeMessage<string>,
  $id: MessageType<string>,
) {
  const $model = ActualMessage(model);
  return Context<R>(
    CRUDTransport(),
    Record({
      method: "delete",
      model: $model,
      query: Record({
        id: $id,
      }),
      credentials: "include",
    }),
  ).catch(NewContext("error"));
}
