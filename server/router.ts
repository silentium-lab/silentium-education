import { type InformationType, Lazy, Of } from "silentium";
import { Router } from "silentium-components";
import { Health } from "./src/routes/Health";

export const router = new Lazy(
  () =>
    new Router(
      new Of("/"),
      new Of([
        {
          pattern: "^/?$",
          template: new Lazy(() => new Health()),
        },
      ]) as InformationType,
      new Of('{"message": "not found"}'),
    ),
);
