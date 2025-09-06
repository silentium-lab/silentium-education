import type { IncomingMessage } from "node:http";
import { type InformationType, Lazy, Of } from "silentium";
import { Router, Tick } from "silentium-components";
import { mongoTransport } from "./bootstrap";
import { CRUDRouter } from "./src/app/CRUDRouter";
import { Query } from "./src/modules/string/Query";
import { Auth } from "./src/routes/Auth";
import { Health } from "./src/routes/Health";
import { Settings } from "./src/routes/Settings";
import { notFoundSrc } from "./store";

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
          pattern: "^.+:/articles.*$",
          template: new Lazy(() => new CRUDRouter(req, mongoTransport, '/articles', 'documents')),
        },
        {
          pattern: "^.+:/categories.*$",
          template: new Lazy(() => new CRUDRouter(req, mongoTransport, '/categories', 'categories')),
        },
        {
          pattern: "^GET:/settings$",
          template: new Lazy(() => new Settings()),
        },
      ]) as InformationType,
      notFoundSrc as any,
    ),
  );
});
