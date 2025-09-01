import type { IncomingMessage } from "node:http";
import { Applied, type InformationType, Lazy, Of } from "silentium";
import { Router, Tick } from "silentium-components";
import { Articles } from "./src/routes/Articles";
import { Auth } from "./src/routes/Auth";
import { Health } from "./src/routes/Health";
import { Settings } from "./src/routes/Settings";

export const router = new Lazy((req: InformationType<IncomingMessage>) => {
  return new Tick(
    new Router(
      new Applied(req, (r) => r.url),
      new Of([
        {
          pattern: "^/?$",
          template: new Lazy(() => new Health()),
        },
        {
          pattern: "^/auth$",
          template: new Lazy(() => new Auth()),
        },
        {
          pattern: "^/articles$",
          template: new Lazy(() => new Articles()),
        },
        {
          pattern: "^/settings$",
          template: new Lazy(() => new Settings()),
        },
      ]) as InformationType,
      new Of('{"message": "not found"}'),
    ),
  );
});
