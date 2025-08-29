import { OwnerType, TheInformation } from "silentium";
import { RecordOf, Template } from "silentium-components";
import { Button } from "../components/Button";
import { titleSrc } from "../store";

export class Home extends TheInformation<string> {
  value(o: OwnerType<unknown>): this {
    titleSrc.give('Главная');
    new Template(
      `
      <div>Home Page</div>
      <div>$b1</div>
      `,
      new RecordOf({
        $b1: new Button(),
      }),
    ).value(o);
    return this;
  }
}
