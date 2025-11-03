import {
  Applied,
  Event,
  type EventType,
  LateShared,
  Of,
  Primitive,
} from "silentium";
import {
  Constant,
  First,
  Path,
  Polling,
  Template,
  Tick,
} from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements, Timer } from "silentium-web-api";
import { $notification } from "../bootstrap";
import { Footer } from "../chunks/Footer";
import { Header } from "../chunks/Header";

export function App($route: EventType<string>): EventType<HTMLElement> {
  return Event((transport) => {
    const t = Template();
    const $notified = LateShared(false);
    Constant(true, Tick($notification)).event($notified);
    Constant(false, Polling<unknown>(Timer(5000), $notification)).event(
      $notified,
    );
    t.template(
      `<div class="container mx-auto px-3 h-full flex flex-col">
				${t.var(Header())}
				<section class="content">
				${t.var($route)}
				</section>
				${t.var(Footer())}
				<div class="fixed top-2 right-2 p-2 rounded-md bg-${t.var(Of(Primitive(Path($notification, Of("type"))) as unknown as string))} ${t.var(Applied($notified, (show) => (show ? "visible" : "hidden")))}">
				${t.var(Of(Primitive(Path($notification, Of("content"))) as unknown as string))}
				</div>
			</div>`,
    );
    const $el = First(Elements(Of("body .app")));
    Render($el, t).event(transport);
  });
}

// bg-success
