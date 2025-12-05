import { MountPoint } from "@/modules/render/MountPoint";
import { Applied, MessageType } from "silentium";
import { Template } from "silentium-components";

export function ErrorList($errors: MessageType) {
  return Template(
    (t) =>
      `<div class="errors ${t.var(
        MountPoint(
          Template(
            (t) => `<div>
              ${t.var(
                Applied($errors, (e: any) =>
                  Object.keys(e)
                    .filter((i) => e[i].length)
                    .map(
                      (i) =>
                        `<div><b>${i}</b>: <span>${e[i].join(", ")}</span></div>`,
                    )
                    .join(""),
                ),
              )}
            </div>`,
          ),
        ),
      )}"></div>`,
  );
}
