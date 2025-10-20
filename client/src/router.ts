import { partial } from "lodash-es";
import { Of, Shared } from "silentium";
import { Router } from "silentium-components";
import { About } from "./pages/About";
import { Admin } from "./pages/Admin";
import { AdminConfigGuard } from "./pages/Admin/AdminConfigGuard";
import { Blog } from "./pages/Blog";
import { Documentation } from "./pages/Documentation";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { urlSrc } from "./store";

export const routerSrc = Shared(
  Router(
    urlSrc.event,
    Of([
      {
        pattern: "^/?$",
        template: Home,
      },
      {
        pattern: "/about",
        template: About,
      },
      {
        pattern: "/documentation",
        template: Documentation,
      },
      {
        pattern: "/blog",
        template: Blog,
      },
      {
        pattern: "/admin.*",
        template: partial(AdminConfigGuard, Admin),
      },
    ]),
    NotFound,
  ),
);
