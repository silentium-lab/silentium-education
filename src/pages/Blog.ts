import { OwnerType, TheInformation } from "silentium";
import { titleSrc } from "../store";

export class Blog extends TheInformation {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Блог');
    o.give(`<div class='article'>
      <h1 class="title-1">Блог</h1>
    </div>`);
    return this;
  }
}
