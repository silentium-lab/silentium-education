import { $notification } from "@/bootstrap";
import { Applied, Late, Of, Primitive } from "silentium";
import {
  Constant,
  Path,
  Polling,
  Task,
  Template,
  Tick,
} from "silentium-components";

export function Notifications() {
  const $notified = Late(false);
  $notified.chain(Constant(true, Tick($notification)));
  $notified.chain(
    Constant(false, Polling<unknown>(Task(NaN, 5000), $notification)),
  );
  return Template(
    (
      t,
    ) => `<div class="fixed top-2 right-2 p-2 rounded-md bg-${t.var(Of(Primitive(Path($notification, Of("type"))) as unknown as string))} ${t.var(Applied($notified, (show) => (show ? "visible" : "hidden")))}">
      ${t.var(Of(Primitive(Path($notification, Of("content"))) as unknown as string))}
    </div>`,
  );
}
