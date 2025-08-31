import { InformationType, MaybeInformationType, MbInfo, On, OwnerType, Shared, TheInformation, Void } from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Clicked } from "../modules/Clicked";
import { Id } from "../modules/Id";

export class Button extends TheInformation<string> {
  private labelSrc: InformationType<string>;
  private classSrc: InformationType<string>;

  public constructor(
    theLabel: MaybeInformationType<string>,
    theClass: MaybeInformationType<string> = "",
    private valueOwner: OwnerType = new Void()
  ) {
    super();
    this.labelSrc = this.dep(new MbInfo(theLabel));
    this.classSrc = this.dep(new MbInfo(theClass));
  }

  public value(o: OwnerType<string>): this {
    const idSrc = new Shared(new Id());

    new On(
      new Clicked(new First(new Elements(new ClassName(idSrc)))),
      (e) => {
        e.preventDefault();
        this.valueOwner.give(e);
      }
    );

    const t = new Template();
    t.template(
      `<button class="${t.var(idSrc)} ${t.var(this.classSrc)} cursor-pointer">
        ${t.var(this.labelSrc)}
      </button>`,
    ).value(o);

    return this;
  }
}
