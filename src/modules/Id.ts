import {
  Applied,
  InformationType,
  Of,
  OwnerType,
  TheInformation,
} from "silentium";
import { v4 } from "uuid";

export class Id extends TheInformation<string> {
  public constructor(private baseSrc: InformationType<string> = new Of("id")) {
    super(baseSrc);
  }

  public value(o: OwnerType<string>): this {
    new Applied(this.baseSrc, (base) => base + "_" + v4()).value(o);
    return this;
  }
}
