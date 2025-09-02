import {
	type InformationType,
	type MaybeInformationType,
	MbInfo,
	On,
	type OwnerType,
	Shared,
	TheInformation,
} from "silentium";
import { First, Sync, Template } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Clicked } from "../modules/Clicked";
import { Id } from "../modules/Id";
import { urlSrc } from "../store";

export class Link extends TheInformation<string> {
	private urlSrc: InformationType<string>;
	private textSrc: InformationType<string>;
	private classSrc: InformationType<string>;

	public constructor(
		theUrlSrc: MaybeInformationType<string>,
		theTextSrc: MaybeInformationType<string>,
		theClassSrc: MaybeInformationType<string> = "",
	) {
		super();
		this.urlSrc = this.dep(new MbInfo(theUrlSrc));
		this.textSrc = this.dep(new MbInfo(theTextSrc));
		this.classSrc = this.dep(new MbInfo(theClassSrc));
	}

	public value(o: OwnerType<string>): this {
		const idSrc = new Shared(new Id());
		this.addDep(idSrc);
		const sharedUrlSrc = new Shared(this.urlSrc);
		const urlSync = new Sync(sharedUrlSrc);

		new On(new Clicked(new First(new Elements(new ClassName(idSrc)))), (e) => {
			e.preventDefault();
			urlSrc.give(urlSync.valueSync());
		});

		const t = new Template();
		t.template(
			`<a
        href="${t.var(sharedUrlSrc)}"
        class="${t.var(idSrc)} ${t.var(this.classSrc)}"
      >
        ${t.var(this.textSrc)}
      </a>`,
		).value(o);

		return this;
	}
}
