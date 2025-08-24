import { FromEvent, InformationType, Of, OwnerType, TheInformation } from "silentium";

export class Clicked extends TheInformation<Event> {
  public constructor(private elSrc: InformationType<HTMLElement>) {
    super(elSrc);
  }

  public value(o: OwnerType<Event>): this {
    const eventSrc = new FromEvent(
      this.elSrc,
      new Of("click"),
      new Of("addEventListener"),
      new Of("removeEventListener"),
    ).value(o);
    this.addDep(eventSrc);
    return this;
  }
}
