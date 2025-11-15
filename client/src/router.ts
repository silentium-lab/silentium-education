import { About } from "@/pages/About";
import { Admin } from "@/pages/Admin";
import { AdminConfigGuard } from "@/pages/Admin/AdminConfigGuard";
import { Blog } from "@/pages/Blog";
import { Documentation } from "@/pages/Documentation";
import { Home } from "@/pages/Home";
import { Of, Shared, TransportMessage } from "silentium";
import { Router } from "silentium-components";
import { NotFound } from "./pages/NotFound";
import { $url } from "./store";

export const $router = Shared(
  Router(
    $url,
    Of([
      {
        pattern: "^/?$",
        message: TransportMessage(Home),
      },
      {
        pattern: "/about",
        message: TransportMessage(About),
      },
      {
        pattern: "/documentation",
        message: TransportMessage(Documentation),
      },
      {
        pattern: "/blog",
        message: TransportMessage(Blog),
      },
      {
        pattern: "/admin.*",
        message: TransportMessage(() => AdminConfigGuard(Admin())),
      },
    ]),
    TransportMessage(NotFound),
  ),
);
