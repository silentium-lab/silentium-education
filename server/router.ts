import { type InformationType, Lazy, Of } from "silentium";
import { Router, Tick } from "silentium-components";
import { Health } from "./src/routes/Health";

export const router = new Lazy(
  () =>
    new Tick(new Router(
      new Of("/"),
      new Of([
        {
          pattern: "^/?$",
          template: new Lazy(() => new Health()),
        },
      ]) as InformationType,
      new Of('{"message": "not found"}'),
    )),
);
