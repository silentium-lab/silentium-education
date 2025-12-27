import { About } from "@/pages/About";
import { Admin } from "@/pages/Admin";
import { AdminAuthGuard } from "@/pages/Admin/AdminAuthGuard";
import { AdminConfigGuard } from "@/pages/Admin/AdminConfigGuard";
import { ArticleView } from "@/pages/ArticleView";
import { Blog } from "@/pages/Blog";
import { Documentation } from "@/pages/Documentation";
import { Home } from "@/pages/Home";
import { Context, Shared } from "silentium";
import { Router } from "silentium-components";
import { NotFound } from "./pages/NotFound";

const $url = Context<string>("url");

export const $router = Shared(
  Router(
    $url,
    [
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
        pattern: "^/blog$|^/blog.*/list$",
        message: Blog,
      },
      {
        pattern: "^/article.*/view$",
        message: ArticleView,
      },
      {
        pattern: "/admin.*",
        message: () => AdminConfigGuard(AdminAuthGuard(Admin())),
      },
    ],
    NotFound,
  ),
);
