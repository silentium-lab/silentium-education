import { OwnerType, TheInformation } from "silentium";

export class About extends TheInformation {
  value(o: OwnerType<unknown>): this {
    o.give("<div>About Page</div>");
    return this;
  }
}
