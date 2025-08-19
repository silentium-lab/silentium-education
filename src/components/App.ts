import { all, applied, i } from "silentium";
import { first } from "silentium-components";
import { render } from "silentium-morphdom";
import { elements } from "silentium-web-api";
import { button } from "./Button";

export const app = render(
  first(elements(i("body .app"))),
  applied(
    all(button(), button(), button()),
    (b) => `<div class="app">
      <header>Header</header>
      <div class="content">
        ${b.join("</div><br><div>")}
      </div>
      <footer>Footer</footer>
    </div>`,
  ),
);
