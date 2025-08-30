import { OwnerType, TheInformation } from "silentium";
import { titleSrc } from "../store";

export class Documentation extends TheInformation {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Документация');
    o.give(`<div class="article">
        <h1 class="title-1">Документация</h1>
      </div>`);
    return this;
  }
}
