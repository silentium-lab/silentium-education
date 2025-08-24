import { Applied, InformationType, TheInformation, TheOwner } from "silentium";

export class ClassName extends TheInformation<string> {
  public constructor(private s: InformationType<string>) {
    super(s);
  }

  public value(o: TheOwner<string>): this {
    new Applied(this.s, (s) => "." + s).value(o);
    return this;
  }
}
