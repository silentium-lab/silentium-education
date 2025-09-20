import {
	Applied,
	type InformationType,
	LateShared,
	Of,
	type OwnerType,
	PrimitiveSource,
	TheInformation
} from "silentium";
import { Const, First, Path, Polling, Template, Tick } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements, Timer } from "silentium-web-api";
import { notificationSrc } from "../bootstrap";
import { Footer } from "../chunks/Footer";
import { Header } from "../chunks/Header";

export class App extends TheInformation {
	constructor(private routeSrc: InformationType<string>) {
		super(routeSrc);
	}

	value(o: OwnerType): this {
		const t = new Template();
		const showNotificationSrc = new LateShared(false);
		new Const(true, new Tick(notificationSrc)).value(showNotificationSrc);
		new Const(false, new Polling<unknown>(new Timer(5000), notificationSrc)).value(showNotificationSrc);
		new Render(
			new First(new Elements(new Of("body .app"))),
			t.template(
				`<div class="container mx-auto px-3 h-full flex flex-col">
				${t.var(new Header())}
				<section class="content">
				${t.var(this.routeSrc)}
				</section>
				${t.var(new Footer())}
				<div class="fixed top-2 right-2 p-2 rounded-md bg-${t.var(new Of<unknown>(new PrimitiveSource(new Path(notificationSrc, new Of('type')))))} ${t.var(new Applied(showNotificationSrc, show => show ? 'visible' : 'hidden'))}">
				${t.var(new Of<unknown>(new PrimitiveSource(new Path(notificationSrc, new Of('content')))))}
				</div>
				</div>`,
			),
		).value(o);
		return this;
	}
}

// bg-success
