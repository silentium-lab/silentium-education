import {
  Of,
  OwnerType,
  TheInformation,
} from "silentium";

export class Footer extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    new Of(
      `<div class="mt-2">Footer here</div>`,
    ).value(o);

    return this;
  }
}
