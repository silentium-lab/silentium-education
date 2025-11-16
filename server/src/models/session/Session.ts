import { MessageType, RPC } from "silentium";
import { Record } from "silentium-components";

export function Session($key: MessageType<string>) {
  return RPC(
    Record({
      transport: "cache",
      method: "get",
      params: Record({
        key: $key,
      }),
    }),
  );
}
