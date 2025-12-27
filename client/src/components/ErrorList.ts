import { html } from "@/modules/plugins/lang/html";
import { MountPoint } from "@/modules/render/MountPoint";
import { Applied, MessageType } from "silentium";
import { Template } from "silentium-components";

export function ErrorList($errors: MessageType) {
  return Template(
    (t) =>
      html`<div
        class="errors ${t.escaped(
          MountPoint(
            Template(
              (t) =>
                html`<div>
                  ${t.raw(
                    Applied($errors, (e: any) =>
                      Object.keys(e)
                        .filter((i) => e[i].length)
                        .map(
                          (i) =>
                            html`<div>
                              <b>${i}</b>: <span>${e[i].join(", ")}</span>
                            </div>`,
                        )
                        .join(""),
                    ),
                  )}
                </div>`,
            ),
          ),
        )}"
      ></div>`,
  );
}
