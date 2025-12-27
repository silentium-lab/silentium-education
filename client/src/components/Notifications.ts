import { $notification } from "@/bootstrap";
import { html } from "@/modules/plugins/lang/html";
import { Applied, Late, Of, Primitive } from "silentium";
import {
  Constant,
  Path,
  Polling,
  Task,
  Template,
  Tick,
} from "silentium-components";
import { Log } from "silentium-web-api";

export function Notifications() {
  const $notified = Late(false);
  $notified.chain(Constant(true, Tick($notification)));
  $notified.chain(
    Constant(false, Polling<unknown>(Task(NaN, 5000), $notification)),
  );
  $notification.then(Log("notification"));
  return Template(
    (t) =>
      html`<div
        class="fixed top-2 right-2 p-2 rounded-md bg-${t.escaped(
          Path($notification, "type"),
        )} ${t.escaped(
          Applied($notified, (show) => (show ? "visible" : "hidden")),
        )}"
      >
        ${t.raw(Path($notification, "content"))}
      </div>`,
  );
}
