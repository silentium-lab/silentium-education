import { EventType, of } from "silentium";
import { template } from "silentium-components";
import { linkExternal } from "../components/LinkExternal";
import { i18n } from "../store";
import { logoSrc } from "./Logo";

export const footer = (): EventType<string> => (user) => {
  const t = template();
  t.template(
    `<footer class="mt-auto py-2 flex justify-between items-center gap-2 flex-wrap">
        <span>
          ${t.var(of(new Date().getFullYear().toString()))}
          &copy;
        </span>
        <div class="px-2 mr-auto">
          ${t.var(linkExternal(of("https://t.me/silentium_js"), i18n.tr("tg_group")))}
        </div>
        ${t.var(logoSrc)}
      </footer>`,
  )
  t.value(user);
}
