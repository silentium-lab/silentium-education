import { applied, i } from "silentium";
import { render } from "silentium-morphdom";
import { elements } from "silentium-web-api";
import { first } from "silentium-components";
import "./assets/common.scss";
import { button } from "./components/Button";

const headerSrc = render(
  first(elements(i("#header .inner"))),
  applied(button(), (b) => `<div class="inner">${b}</div>`),
);
headerSrc(() => {});
