import {
  type InformationType,
  type MaybeInformationType,
  MbInfo,
  type OwnerType,
  TheInformation,
} from "silentium";
import { Template } from "silentium-components";

export class LinkExternal extends TheInformation<string> {
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
    const t = new Template();
    t.template(
      `<a
        href="${t.var(this.urlSrc)}"
        target="_blank"
        class="${t.var(this.classSrc)}"
      >
        ${t.var(this.textSrc)}
      </a>`,
    ).value(o);

    return this;
  }
}
