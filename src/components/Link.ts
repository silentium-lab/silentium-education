import {
  InformationType,
  MaybeInformation,
  MaybeInformationType,
  On,
  OwnerType,
  Shared,
  TheInformation,
} from "silentium";
import { First, RecordOf, Sync, Template } from "silentium-components";
import { Id } from "../modules/Id";
import { Clicked } from "../modules/Clicked";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
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
    const urlSync = new Sync(this.urlSrc);

    new On(new Clicked(new First(new Elements(new ClassName(idSrc)))), () => {
      urlSrc.owner().give(urlSync.valueSync());
    });

    new Template(
      `<span class="$id" style="text-decoration: underline;cursor: pointer;">$text</span>`,
      new RecordOf({
        $id: idSrc,
        $text: this.textSrc,
      }),
    ).value(o);

    return this;
  }
}
