import { OwnerType, TheInformation } from "silentium";
import { titleSrc } from "../store";

export class Documentation extends TheInformation {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Документация');
    o.give("<div>Documentation Page</div>");
    return this;
  }
}
