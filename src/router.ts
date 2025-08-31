import { type InformationType, Lazy, Of } from "silentium";
import { Router } from "silentium-components";
import { About } from "./pages/About";
import { Admin } from "./pages/Admin";
import { Blog } from "./pages/Blog";
import { Documentation } from "./pages/Documentation";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { urlSrc } from "./store";

export const routerSrc = new Router(
  urlSrc,
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
