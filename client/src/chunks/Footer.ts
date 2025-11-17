import { logoSrc } from "@/chunks/Logo";
import { LinkExternal } from "@/components/LinkExternal";
import { i18n } from "@/store";
import { Message, Of } from "silentium";
import { Template } from "silentium-components";

export function Footer() {
  return Message<string>((transport) => {
    const t = Template();
    t.template(
      `<footer class="py-2 flex justify-between items-center gap-2 flex-wrap">
          <span>
            ${t.var(Of(new Date().getFullYear().toString()))}
            &copy;
          </span>
          <div class="px-2 mr-auto">
            ${t.var(LinkExternal(Of("https://t.me/silentium_js"), i18n.tr("tg_group")))}
          </div>
          ${t.var(logoSrc)}
        </footer>`,
    );
    t.pipe(transport);
  });
}
