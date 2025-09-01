import { Of, type OwnerType, TheInformation } from "silentium";
import { ToJson } from "silentium-components";

export class Articles extends TheInformation<string> {
  value(o: OwnerType<string>): this {
    new ToJson(
      new Of({
        message: "do Articles",
      }),
    ).value(o);
    return this;
  }
}
