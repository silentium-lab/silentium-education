import {
  InformationType,
  MaybeInformationType,
  MbInfo,
  OwnerType,
  TheInformation,
} from "silentium";
import { Template } from "silentium-components";
import { Button } from "../components/Button";
import { langSrc } from "../store";

export class Lang extends TheInformation<string> {
  private classSrc: InformationType<string>;

  public constructor(
    theClassSrc: MaybeInformationType<string> = "",
  ) {
    super();
    this.classSrc = this.dep(new MbInfo(theClassSrc));
  }

  public value(o: OwnerType<string>): this {
    const t = new Template();
    t.template(
      `<nav class="px-2 ${t.var(this.classSrc)}">
        ${t.var(new Button("ru", "ru", langSrc))}
        ${t.var(new Button("en", "en", langSrc))}
      </nav>`,
    ).value(o);

    return this;
  }
}
