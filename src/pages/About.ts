import { OwnerType, TheInformation } from "silentium";
import { RecordOf, Template } from "silentium-components";
import { Button } from "../components/Button";

export class About extends TheInformation {
  value(o: OwnerType<unknown>): this {
    new Template(
      `<div>About Page</div>
      <div>$b1</div>
      <div>$b2</div>`,
      new RecordOf({
        $b1: new Button(),
        $b2: new Button(),
      }),
    ).value(o);

    return this;
  }
}
