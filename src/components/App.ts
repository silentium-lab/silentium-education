import { InformationType, Of, OwnerType, TheInformation } from "silentium";
import { First, RecordOf, Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements } from "silentium-web-api";
import { Button } from "./Button";
import { Link } from "./Link";

export class App extends TheInformation {
  constructor(private routeSrc: InformationType<string>) {
    super(routeSrc);
  }

  value(o: OwnerType): this {
    new Render(
      new First(new Elements(new Of("body .app"))),
      new Template(
        `<div class="app">
          <header>Header</header>
          <div>
            $link $link2
          </div>
          <div class="content">$route</div>
          <div class="content">$b1</div>
          <div class="content">$b2</div>
          <div class="content">$b3</div>
          <footer>Footer</footer>
        </div>`,
        new RecordOf({
          $route: this.routeSrc,
          $link: new Link(new Of(""), new Of("Главная")),
          $link2: new Link(new Of("/about"), new Of("О нас")),
          $b1: new Button(),
          $b2: new Button(),
          $b3: new Button(),
        }),
      ),
    ).value(o);
    return this;
  }
}
