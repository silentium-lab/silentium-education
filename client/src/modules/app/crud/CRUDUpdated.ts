import { CRUDTransport } from "@/modules/app/crud/CRUDTransport";
import { NewContext } from "@/modules/context/Context";
import {
  ActualMessage,
  Context,
  MaybeMessage,
  MessageType,
  Of,
} from "silentium";
import { Concatenated, Record } from "silentium-components";

export function CRUDUpdated<R = unknown>(
  model: MaybeMessage<string>,
  $id: MessageType<string>,
  $form: MessageType,
) {
  const $model = ActualMessage(model);
  return Context<R>(
    CRUDTransport(),
    Record({
      method: "put",
      model: Concatenated([$model, Of("/"), $id, Of("/")]),
      body: $form,
      credentials: "include",
    }),
  ).catch(NewContext("error"));
}
