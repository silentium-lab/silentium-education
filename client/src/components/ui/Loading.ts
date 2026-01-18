import { Default, Empty, MessageType } from "silentium";

export function Loading(base: MessageType<string>) {
  return Default(Empty(base), "Loading...");
}
