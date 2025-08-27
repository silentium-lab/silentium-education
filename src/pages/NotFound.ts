import { OwnerType, TheInformation } from "silentium";

export class NotFound extends TheInformation {
  value(o: OwnerType<unknown>): this {
    o.give("<div>Not found</div>");
    return this;
  }
}
