import { Applied, MessageType } from "silentium";

export function OnlyKnownFields($base: MessageType<unknown>, fields: string[]) {
  return Applied($base, (base) => {
    const keys = Object.keys(base as Record<string, unknown>);
    keys.forEach((key) => {
      if (!fields.includes(key)) {
        throw new Error(`Field ${key} is unavailable`);
      }
    });
    return base;
  });
}
