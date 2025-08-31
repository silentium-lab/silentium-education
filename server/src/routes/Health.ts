import { Of, OwnerType, TheInformation } from "silentium";
import { ToJson } from "silentium-components";

export class Health extends TheInformation<string> {
  value(o: OwnerType<string>): this {
    new ToJson(
      new Of({
        time: Date.now(),
      }),
    ).value(o);
    return this;
  }
}
