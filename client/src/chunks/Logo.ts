import { Of } from "silentium";
import { Link } from "@/components/Link";
import { html } from "@/modules/plugins/lang/html";

export const logoSrc = Link(
  Of("/"),
  Of(
    html`<span class="text-logo flex gap-2 align-middle no-underline">
      <img
        width="30"
        height="30"
        src="${new URL("../assets/logo.svg", import.meta.url).href}"
      />
      SILENTIUM
    </span>`,
  ),
);
