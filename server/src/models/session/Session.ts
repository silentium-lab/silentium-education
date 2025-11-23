import { Context, MessageType } from "silentium";
import { Record } from "silentium-components";

export function Session($key: MessageType<string>) {
  return Context(
    Record({
      transport: "cache",
      method: "get",
      params: Record({
        key: $key,
      }),
    }),
  );
}
