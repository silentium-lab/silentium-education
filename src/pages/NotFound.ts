import { OwnerType, TheInformation } from "silentium";
import { titleSrc } from "../store";

export class NotFound extends TheInformation<string> {
  value(o: OwnerType<string>): this {
    titleSrc.give('Не найдено');
    o.give("<div>Not found</div>");
    return this;
  }
}
