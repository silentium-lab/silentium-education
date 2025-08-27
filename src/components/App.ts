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
            $link1
            $link2
            $link3
            $link4
          </div>
          <div class="content">$route</div>
          <div class="content">$b1</div>
          <div class="content">$b2</div>
          <div class="content">$b3</div>
          <footer>Footer</footer>
        </div>`,
        new RecordOf({
          $route: this.routeSrc,
          $link1: new Link(new Of(""), new Of("Главная")),
          $link2: new Link(new Of("/about"), new Of("О нас")),
          $link3: new Link(new Of("/docs"), new Of("Документация")),
          $link4: new Link(new Of("/contacts"), new Of("Контакты")),
          $b1: new Button(),
          $b2: new Button(),
          $b3: new Button(),
        }),
      ),
    ).value(o);
    return this;
  }
}
