import { Of, type OwnerType, TheInformation } from "silentium";
import { ToJson } from "silentium-components";

export class Settings extends TheInformation<string> {
  value(o: OwnerType<string>): this {
    new ToJson(
      new Of({
        message: "do Settings",
      }),
    ).value(o);
    return this;
  }
}
