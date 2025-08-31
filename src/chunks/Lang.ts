import {
  type InformationType,
  Late,
  type MaybeInformationType,
  MbInfo,
  type OwnerType,
  SharedSource,
  TheInformation,
} from "silentium";
import { Const, Template } from "silentium-components";
import { Button } from "../components/Button";
import { langSrc } from "../store";

export class Lang extends TheInformation<string> {
  private classSrc: InformationType<string>;

  public constructor(theClassSrc: MaybeInformationType<string> = "") {
    super();
    this.classSrc = this.dep(new MbInfo(theClassSrc));
  }

  public value(o: OwnerType<string>): this {
    const selectRu = new SharedSource(new Late());
    const selectEn = new SharedSource(new Late());

    new Const("ru", selectRu).value(langSrc);
    new Const("en", selectEn).value(langSrc);

    const t = new Template();
    t.template(
      `<nav class="px-2 ${t.var(this.classSrc)}">
        ${t.var(new Button("ru", "", selectRu))}
        ${t.var(new Button("en", "", selectEn))}
      </nav>`,
    ).value(o);

    return this;
  }
}
