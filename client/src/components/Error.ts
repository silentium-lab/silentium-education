import { Applied, MessageType } from "silentium";
import { Memo } from "silentium-components";

export function Error(field: string, $errors: MessageType) {
  return Memo(
    Applied(
      $errors,
      (e: any) => `<span class="text-error">${e[field] ?? ""}</span>`,
    ),
  );
}
