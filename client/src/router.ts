import { Of, Shared, TransportEvent } from "silentium";
import { Router } from "silentium-components";
import { About } from "@/pages/About";
import { Admin } from "@/pages/Admin";
import { AdminConfigGuard } from "@/pages/Admin/AdminConfigGuard";
import { Blog } from "@/pages/Blog";
import { Documentation } from "@/pages/Documentation";
import { Home } from "@/pages/Home";
import { NotFound } from "./pages/NotFound";
import { $url } from "./store";

export const routerSrc = Shared(
  Router(
    $url,
    Of([
      {
        pattern: "^/?$",
        event: TransportEvent(Home),
      },
      {
        pattern: "/about",
        event: TransportEvent(About),
      },
      {
        pattern: "/documentation",
        event: TransportEvent(Documentation),
      },
      {
        pattern: "/blog",
        event: TransportEvent(Blog),
      },
      {
        pattern: "/admin.*",
        event: TransportEvent(() => AdminConfigGuard(Admin())),
      },
    ]),
    TransportEvent(NotFound),
  ),
);
