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

export function CRUDEntity<R = unknown>(
  model: MaybeMessage<string>,
  $id: MessageType<string>,
) {
  const $model = ActualMessage(model);
  return Context<R>(
    CRUDTransport(),
    Record({
      method: "get",
      model: Concatenated([$model, Of("/"), $id, Of("/")]),
      credentials: "include",
    }),
  ).catch(NewContext("error"));
}
