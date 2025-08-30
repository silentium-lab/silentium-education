import { InformationType, Lazy, Of } from "silentium";
import { Router } from "silentium-components";
import { About } from "./pages/About";
import { Documentation } from "./pages/Documentation";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { sharedUrlSrc } from "./store";
import { Blog } from "./pages/Blog";
import { Admin } from "./pages/Admin";

export const routerSrc = new Router(
  sharedUrlSrc,
  new Of([
    {
      pattern: "^/?$",
      template: new Lazy(() => new Home()),
    },
    {
      pattern: "/about",
      template: new Lazy(() => new About()),
    },
    {
      pattern: "/documentation",
      template: new Lazy(() => new Documentation()),
    },
    {
      pattern: "/blog",
      template: new Lazy(() => new Blog()),
    },
    {
      pattern: "/admin",
      template: new Lazy(() => new Admin()),
    },
  ]) as InformationType,
  new NotFound(),
);
