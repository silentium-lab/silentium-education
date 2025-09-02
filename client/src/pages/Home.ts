import { type OwnerType, TheInformation } from "silentium";
import { Template } from "silentium-components";
import { Counter } from "../chunks/Counter";
import { i18n, titleSrc } from "../store";

export class Home extends TheInformation<string> {
	value(o: OwnerType<unknown>): this {
		i18n.tr("home").value(titleSrc);
		const t = new Template();
		t.template(
			`<section class="article">
        <h1 class="title-1">
          Silentium
        </h1>
        <div>${t.var(new Counter())}</div>
      </section>`,
		).value(o);
		return this;
	}
}
