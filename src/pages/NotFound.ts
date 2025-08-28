import { OwnerType, TheInformation } from "silentium";

export class NotFound extends TheInformation<string> {
  value(o: OwnerType<string>): this {
    o.give("<div>Not found</div>");
    return this;
  }
}
