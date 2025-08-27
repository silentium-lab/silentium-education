import { Router } from "silentium-components";
import { sharedUrlSrc } from "./store";
import { Of } from "silentium";

export const routerSrc = new Router(
  sharedUrlSrc,
  new Of([
    {
      pattern: "^$",
      template: new Of("Home") as any,
    },
    {
      pattern: "/about",
      template: "About",
    },
  ]),
  new Of("not_found"),
);
