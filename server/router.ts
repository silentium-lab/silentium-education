import type { IncomingMessage } from "node:http";
import { type InformationType, Lazy, Of } from "silentium";
import { Router, Tick } from "silentium-components";
import { Query } from "./src/modules/string/Query";
import { Articles } from "./src/routes/Articles";
import { Auth } from "./src/routes/Auth";
import { Health } from "./src/routes/Health";
import { Settings } from "./src/routes/Settings";

export const router = new Lazy((req: InformationType<IncomingMessage>) => {
  return new Tick(
    new Router(
      new Query(req),
      new Of([
        {
          pattern: "^GET:/?$",
          template: new Lazy(() => new Health()),
        },
        {
          pattern: "^GET:/auth$",
          template: new Lazy(() => new Auth()),
        },
        {
          pattern: "^GET:/articles$",
          template: new Lazy(() => new Articles()),
        },
        {
          pattern: "^GET:/settings$",
          template: new Lazy(() => new Settings()),
        },
      ]) as InformationType,
      new Of('{"message": "not found"}'),
    ),
  );
});
