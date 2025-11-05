import { $notification } from "@/bootstrap";
import { Footer } from "@/chunks/Footer";
import { Header } from "@/chunks/Header";
import { Event, type EventType, LateShared, Of } from "silentium";
import { Constant, First, Polling, Template, Tick } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements, Timer } from "silentium-web-api";

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
			</div>`,
    );
    const $el = First(Elements(Of("body .app")));
    Render($el, t).event(transport);
  });
}

// bg-success
