import { Button } from "@/components/Button";
import { html } from "@/modules/plugins/lang/html";
import { JSCodeResult } from "@/modules/render/JSCodeResult";
import { Tr } from "@/store";
import { decode } from "html-entities";
import {
  Applied,
  AppliedDestructured,
  Late,
  MessageType,
  ResetSilenceCache,
  Void,
} from "silentium";
import { Template } from "silentium-components";
import { v4 } from "uuid";

/**
 * Helps to make code examples
 * runnable by pressing button
 */
export function LiveCodeExample($html: MessageType<string>) {
  return Applied($html, (_html: string) => {
    const $run = Late<[string, string]>();
    $run.then((v) => {
      Tr("Loading...").then((label) => {
        const el = document.querySelector(v[1]);
        if (el) {
          el.innerHTML = label;
        }
      });
      $run.use(ResetSilenceCache as any);
    });
    AppliedDestructured($run, JSCodeResult).then(Void());
    return Template((t) =>
      _html.replace(/<pre><code>(.*?)<\/code><\/pre>/gs, (match, code) => {
        const id = v4();
        return html`
          ${match}
          <div>
            ${t.raw(
              Button(Tr("Run"), "btn mb-2", $run, "", [
                decode(code),
                `.id_${id}`,
              ]),
            )}
          </div>
          <div class="result border-gray-700 border-2 mb-2 p-2 id_${id}">
            ${t.escaped(Tr("Press Run to see result"))}
          </div>
        `;
      }),
    );
  });
}
