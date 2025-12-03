import { MountPoint } from "@/modules/render/MountPoint";
import { Applied, Computed, MessageType } from "silentium";
import { Memo, Template } from "silentium-components";

export function ErrorList($errors: MessageType) {
  const $errorEntries = Applied(
    Computed(Object.entries, $errors),
    (entries) => {
      return entries
        .filter((e) => !!e[1].length)
        .map(
          (entry) =>
            `<div><b class="mr-2">${entry[0]}</b><span class="text-error">${entry[1].join()}</span></div>`,
        )
        .join("");
    },
  );
  return Template(
    (t) =>
      `<div class="errors ${t.var(MountPoint(Memo($errorEntries)))}"></div>`,
  );
}
