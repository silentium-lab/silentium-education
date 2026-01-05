import { NewContext } from "@/modules/context/Context";
import { Tr } from "@/modules/I18n";
import { html } from "@/modules/plugins/lang/html";
import { Context, Void } from "silentium";
import { Template } from "silentium-components";

export function Dashboard() {
  const $auth = Context("request", {
    method: "get",
    model: "private/auth",
    credentials: "include",
  });
  $auth.catch(NewContext("error"));
  $auth.then(Void());
  return Template((t) => html`<div>${t.escaped(Tr("Admin panel"))}</div>`);
}
