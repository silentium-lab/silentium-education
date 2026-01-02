import { logoSrc } from "@/chunks/Logo";
import { LinkExternal } from "@/components/LinkExternal";
import { html } from "@/modules/plugins/lang/html";
import { Tr } from "@/store";
import { Of } from "silentium";
import { Template } from "silentium-components";

export function Footer() {
  return Template(
    (t) =>
      html`<footer
        class="py-2 flex justify-between items-center gap-2 flex-wrap"
      >
        <span>
          2025 - ${t.escaped(Of(new Date().getFullYear().toString()))} &copy;
        </span>
        <div class="px-2 mr-auto">
          ${t.raw(
            LinkExternal(Of("https://t.me/silentium_js"), Tr("tg_group")),
          )}
        </div>
        ${t.raw(logoSrc)}
      </footer>`,
  );
}
