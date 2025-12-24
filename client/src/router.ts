import { About } from "@/pages/About";
import { Admin } from "@/pages/Admin";
import { AdminConfigGuard } from "@/pages/Admin/AdminConfigGuard";
import { Blog } from "@/pages/Blog";
import { Documentation } from "@/pages/Documentation";
import { Home } from "@/pages/Home";
import { Context, Of, Shared } from "silentium";
import { Router } from "silentium-components";
import { NotFound } from "./pages/NotFound";
import { AdminAuthGuard } from "@/pages/Admin/AdminAuthGuard";
import { BlogView } from "@/pages/BlogView";

const $url = Context<string>("url");

export const $router = Shared(
  Router(
    $url,
    Of([
      {
        pattern: "^/?$",
        message: Home,
      },
      {
        pattern: "^/about$",
        message: About,
      },
      {
        pattern: "^/documentation$|^/documentation.*/list$",
        message: Documentation,
      },
      {
        pattern: "^/documentation.*/view$",
        message: BlogView,
      },
      {
        pattern: "^/blog$|^/blog.*/list$",
        message: Blog,
      },
      {
        pattern: "^/blog.*/view$",
        message: BlogView,
      },
      {
        pattern: "/admin.*",
        message: () => AdminConfigGuard(AdminAuthGuard(Admin())),
      },
    ]),
    NotFound,
  ),
);
