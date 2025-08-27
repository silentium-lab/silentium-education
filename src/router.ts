import { Lazy, Of } from "silentium";
import { Router } from "silentium-components";
import { About } from "./pages/About";
import { Documentation } from "./pages/Documentation";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { sharedUrlSrc } from "./store";
import { Route } from "./modules/Route";

export const routerSrc = new Router(
  sharedUrlSrc,
  new Of([
    {
      pattern: "^$",
      template: new Route(() => new Home()),
    },
    {
      pattern: "/about",
      template: new About(),
    },
    {
      pattern: "/documentation",
      template: new Documentation(),
    },
  ]),
  new NotFound(),
);
