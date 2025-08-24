import { Of, OwnerType, TheInformation } from "silentium";
import { First, RecordOf, Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements } from "silentium-web-api";
import { Button } from "./Button";

export class App extends TheInformation {
  value(o: OwnerType): this {
    new Render(
      new First(new Elements(new Of("body .app"))),
      new Template(
        `<div class="app">
          <header>Header</header>
          <div class="content">$b1</div>
          <div class="content">$b2</div>
          <div class="content">$b3</div>
          <footer>Footer</footer>
        </div>`,
        new RecordOf({
          $b1: new Button(),
          $b2: new Button(),
          $b3: new Button(),
        })
      ),
    ).value(o);
    return this;
  }
}
