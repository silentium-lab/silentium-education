import { NewContext } from "@/modules/context/Context";
import { Tr } from "@/store";
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
  return Template(
    (t) => `<div>
    ${t.var(Tr("Admin panel"))}
  </div>`,
  );
}
