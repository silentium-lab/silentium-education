import {
  Of,
  OwnerType,
  TheInformation,
} from "silentium";

export class Header extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    new Of(
      `<div class="mb-2">Header here</div>`,
    ).value(o);

    return this;
  }
}
