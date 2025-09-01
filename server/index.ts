import { From } from "silentium";
import { router } from "./router";
import { WebServer } from "./src/modules/WebServer";

new WebServer(router).value(new From(console.log));
