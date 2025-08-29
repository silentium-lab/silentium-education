import { InformationType, Of, OwnerType, TheInformation } from "silentium";
import { First, RecordOf, Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Elements } from "silentium-web-api";
import { Link } from "./Link";
import { Header } from "../chunks/Header";
import { Footer } from "../chunks/Footer";

export class App extends TheInformation {
  constructor(private routeSrc: InformationType<string>) {
    super(routeSrc);
  }

  value(o: OwnerType): this {
    new Render(
      new First(new Elements(new Of("body .app"))),
      new Template(
        `<div class="container mx-auto">
          $header
          <div class="menu">
            $link1
            $link2
            $link3
            $link4
          </div>
          <div class="content">$route</div>
          $footer
        </div>`,
        new RecordOf({
          $header: new Header(),
          $footer: new Footer(),
          $route: this.routeSrc,
          $link1: new Link("/", "Главная"),
          $link2: new Link("/about", "О нас"),
          $link3: new Link("/documentation", "Документация"),
          $link4: new Link("/contacts", "Контакты"),
        }),
      ),
    ).value(o);
    return this;
  }
}
