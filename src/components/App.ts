import { All, Applied, From, Of, OwnerType, TheInformation } from "silentium";
import { First } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements } from "silentium-web-api";
import { Button } from "./Button";

export class App extends TheInformation {
  value(o: OwnerType): this {
    new Render(
      new First(new Elements(new Of("body .app"))),
      new Applied(
        new All(new Button(), new Button(), new Button()),
        (b) => `<div class="app">
          <header>Header</header>
          <div class="content">
            ${b.join("</div><br><div>")}
          </div>
          <footer>Footer</footer>
        </div>`,
      ),
    ).value(o);
    return this;
  }
}
