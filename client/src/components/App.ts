import {
	applied,
	DataType,
	lateShared,
	of,
	primitive
} from "silentium";
import { constant, first, path, polling, template, tick } from "silentium-components";
import { render } from "silentium-morphdom";
import { elements, timer } from "silentium-web-api";
import { notificationSrc } from "../bootstrap";
import { footer } from "../chunks/Footer";
import { header } from "../chunks/Header";

export const app = (routeSrc: DataType<string>): DataType<HTMLElement> => (user) => {
	const t = template();
	const showNotificationSrc = lateShared(false);
	constant(true, tick(notificationSrc.value))(showNotificationSrc.give);
	constant(false, polling<unknown>(timer(5000), notificationSrc.value))(showNotificationSrc.give);
	t.template(
			`<div class="container mx-auto px-3 h-full flex flex-col">
				${t.var(header())}
				<section class="content">
				${t.var(routeSrc)}
				</section>
				${t.var(footer())}
				<div class="fixed top-2 right-2 p-2 rounded-md bg-${t.var(of(primitive(path(notificationSrc.value, of('type'))) as unknown as string))} ${t.var(applied(showNotificationSrc.value, show => show ? 'visible' : 'hidden'))}">
				${t.var(of(primitive(path(notificationSrc.value, of('content'))) as unknown as string))}
				</div>
				</div>`,
		);
	const elSrc = first(elements(of("body .app")));
	render(
		elSrc,
		t.value,
	)(user);
}

// bg-success
