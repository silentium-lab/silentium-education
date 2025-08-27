import { OwnerType, TheInformation } from "silentium";

export class Documentation extends TheInformation {
  value(o: OwnerType<unknown>): this {
    o.give("<div>Documentation Page</div>");
    return this;
  }
}
