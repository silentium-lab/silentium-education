import { Footer } from "@/chunks/Footer";
import { Header } from "@/chunks/Header";
import { Notifications } from "@/components/Notifications";
import { MountPoint } from "@/modules/render/MountPoint";
import { $lang } from "@/store";
import { Any, Chain, Event, type EventType, Of } from "silentium";
import { First, Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements } from "silentium-web-api";

export function App($route: EventType<string>): EventType<HTMLElement> {
  return Event((transport) => {
    const t = Template();
    const $deps = Any($lang);
    t.template(
      `<div class="container mx-auto px-3 h-full flex flex-col">
				${t.var(Header())}
				<section class="content ${t.var(MountPoint(Chain($deps, $route)))}"></section>
				${t.var(Footer())}
        <div class="${t.var(MountPoint(Chain($deps, Notifications())))}"></div>
			</div>`,
    );
    const $el = First(Elements(Of("body .app")));
    Render($el, t).event(transport);
  });
}

// bg-success
