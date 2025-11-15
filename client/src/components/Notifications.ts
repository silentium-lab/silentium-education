import { $notification } from "@/bootstrap";
import { Applied, LateShared, Message, Of, Primitive } from "silentium";
import { Constant, Path, Polling, Template, Tick } from "silentium-components";
import { Timer } from "silentium-web-api";

export function Notifications() {
  return Message<string>((transport) => {
    const $notified = LateShared(false);
    Constant(true, Tick($notification)).to($notified);
    Constant(false, Polling<unknown>(Timer(5000), $notification)).to($notified);
    const t = Template();
    t.template(`<div class="fixed top-2 right-2 p-2 rounded-md bg-${t.var(Of(Primitive(Path($notification, Of("type"))) as unknown as string))} ${t.var(Applied($notified, (show) => (show ? "visible" : "hidden")))}">
      ${t.var(Of(Primitive(Path($notification, Of("content"))) as unknown as string))}
    </div>`);
    t.to(transport);
  });
}
