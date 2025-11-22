import { About } from "@/pages/About";
import { Admin } from "@/pages/Admin";
import { AdminConfigGuard } from "@/pages/Admin/AdminConfigGuard";
import { Blog } from "@/pages/Blog";
import { Documentation } from "@/pages/Documentation";
import { Home } from "@/pages/Home";
import { Of, Shared } from "silentium";
import { Router } from "silentium-components";
import { NotFound } from "./pages/NotFound";
import { $url } from "./store";
import { AdminAuthGuard } from "@/pages/Admin/AdminAuthGuard";

export const $router = Shared(
  Router(
    $url,
    Of([
      {
        pattern: "^/?$",
        message: Home,
      },
      {
        pattern: "/about",
        message: About,
      },
      {
        pattern: "/documentation",
        message: Documentation,
      },
      {
        pattern: "/blog",
        message: Blog,
      },
      {
        pattern: "/admin.*",
        message: () => AdminConfigGuard(AdminAuthGuard(Admin())),
      },
    ]),
    NotFound,
  ),
);
