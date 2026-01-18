import { CRUDTransport } from "@/modules/app/crud/CRUDTransport";
import { NewContext } from "@/modules/context/Context";
import { Actual, Context, MaybeMessage, MessageType } from "silentium";
import { Record } from "silentium-components";

export function CRUDCreated<R = unknown>(
  model: MaybeMessage<string>,
  $form: MessageType,
) {
  const $model = Actual(model);
  return Context<R>(
    CRUDTransport(),
    Record({
      method: "post",
      model: $model,
      body: $form,
      credentials: "include",
    }),
  ).catch(NewContext("error"));
}
