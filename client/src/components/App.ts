import { Applied, type EventType, LateShared, Of, Primitive } from "silentium";
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
import { notificationSrc } from "../bootstrap";
import { Footer } from "../chunks/Footer";
import { Header } from "../chunks/Header";

export function App(routeSrc: EventType<string>): EventType<HTMLElement> {
  return (user) => {
    const t = Template();
    const showNotificationSrc = LateShared(false);
    Constant(true, Tick(notificationSrc.event))(showNotificationSrc.use);
    Constant(
      false,
      Polling<unknown>(Timer(5000), notificationSrc.event),
    )(showNotificationSrc.use);
    t.template(
      `<div class="container mx-auto px-3 h-full flex flex-col">
				${t.var(Header())}
				<section class="content">
				${t.var(routeSrc)}
				</section>
				${t.var(Footer())}
				<div class="fixed top-2 right-2 p-2 rounded-md bg-${t.var(Of(Primitive(Path(notificationSrc.event, Of("type"))) as unknown as string))} ${t.var(Applied(showNotificationSrc.event, (show) => (show ? "visible" : "hidden")))}">
				${t.var(Of(Primitive(Path(notificationSrc.event, Of("content"))) as unknown as string))}
				</div>
			</div>`,
    );
    const elSrc = First(Elements(Of("body .app")));
    Render(elSrc, t.value)(user);
  };
}

// bg-success
