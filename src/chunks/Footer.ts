import {
  Of,
  OwnerType,
  TheInformation,
} from "silentium";
import { Template } from "silentium-components";
import { logoSrc } from "./Logo";

export class Footer extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    const t = new Template();
    t.template(
      `<footer class="mt-auto py-2 flex justify-between">
        <span>
          ${t.var(new Of(new Date().getFullYear().toString()))}
          &copy;
        </span>
        ${t.var(logoSrc)}
      </footer>`,
    ).value(o);

    return this;
  }
}
