import { router } from "./router";
import { WebServer } from "./src/modules/WebServer";

new WebServer(router).start();
