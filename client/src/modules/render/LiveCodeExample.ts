import { Button } from "@/components/Button";
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
  return Applied($html, (html: string) => {
    const $run = Late<[string, string]>();
    $run.then(() => {
      $run.use(ResetSilenceCache as any);
    });
    AppliedDestructured($run, JSCodeResult).then(Void());
    return Template((t) =>
      html.replace(/<pre><code>(.*?)<\/code><\/pre>/gs, (match, code) => {
        const id = v4();
        return `
        ${match}
        <div>${t.var(Button(Tr("Run"), "btn mb-2", $run, "", [decode(code), `.id_${id}`]))}</div>
        <div class="result whitespace-pre border-gray-700 border-2 mb-2 p-2 id_${id}">${t.var(Tr("Press Run to see result"))}</div>
        `;
      }),
    );
  });
}
