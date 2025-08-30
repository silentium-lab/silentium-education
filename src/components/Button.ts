import { InformationType, MaybeInformationType, MbInfo, On, Once, OwnerType, Shared, TheInformation } from "silentium";
import { First, Template } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Clicked } from "../modules/Clicked";
import { Id } from "../modules/Id";

export class Button extends TheInformation<string> {
  private labelSrc: InformationType<string>;
  private valueSrc: InformationType<string>;

  public constructor(
    theLabelSrc: MaybeInformationType<string>,
    theValueSrc: MaybeInformationType<string>,
    private valueOwner: OwnerType<string>
  ) {
    super();
    this.labelSrc = this.dep(new MbInfo(theLabelSrc));
    this.valueSrc = this.dep(new MbInfo(theValueSrc));
  }

  public value(o: OwnerType<string>): this {
    const idSrc = new Shared(new Id());

    new On(
      new Clicked(new First(new Elements(new ClassName(idSrc)))),
      (e) => {
        e.preventDefault();
        new Once(this.valueSrc).value(this.valueOwner);
      }
    );

    const t = new Template();
    t.template(
      `
        <button class="${t.var(idSrc)} cursor-pointer">${t.var(this.labelSrc)}</button>
      `,
    ).value(o);

    return this;
  }
}
