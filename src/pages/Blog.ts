import { OwnerType, TheInformation } from "silentium";
import { titleSrc } from "../store";

export class Blog extends TheInformation {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Блог');
    o.give("<div>Blog Page</div>");
    return this;
  }
}
