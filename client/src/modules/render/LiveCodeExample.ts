import { Button } from "@/components/ui/Button";
import { html } from "@/modules/plugins/lang/html";
import { JSCodeResult } from "@/modules/render/JSCodeResult";
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
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github-dark.min.css";
import { Tr } from "@/modules/I18n";

hljs.registerLanguage("javascript", javascript);

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
      _html.replace(
        /<pre><code class\="language-js">(.*?)<\/code><\/pre>/gs,
        (_, code) => {
          const id = v4();
          const highlightedCode = hljs.highlight(decode(code), {
            language: "javascript",
          }).value;
          return html`
            <pre>${highlightedCode}</pre>
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
        },
      ),
    );
  });
}
