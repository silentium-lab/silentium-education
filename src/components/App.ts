import { InformationType, Of, OwnerType, TheInformation } from "silentium";
import { First, Template } from "silentium-components";
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
    const t = new Template();
    new Render(
      new First(new Elements(new Of("body .app"))),
      t.template(
        `<div class="container mx-auto px-3 h-full flex flex-col">
          ${t.var(new Header())}
          <section class="content">
            ${t.var(this.routeSrc)}
          </section>
          ${t.var(new Footer())}
        </div>`,
      ),
    ).value(o);
    return this;
  }
}
