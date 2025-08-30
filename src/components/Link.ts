import {
  InformationType,
  MaybeInformation,
  MaybeInformationType,
  On,
  OwnerType,
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

  public constructor(
    theUrlSrc: MaybeInformationType<string>,
    theTextSrc: MaybeInformationType<string>,
  ) {
    const urlSrc = new MaybeInformation(theUrlSrc);
    const textSrc = new MaybeInformation(theTextSrc);
    super(urlSrc, textSrc);
    this.urlSrc = urlSrc;
    this.textSrc = textSrc;
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
      `<a href="${t.var(sharedUrlSrc)}" class="${t.var(idSrc)} underline">
        ${t.var(this.textSrc)}
      </a>`,
    ).value(o);

    return this;
  }
}
