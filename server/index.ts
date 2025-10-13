import { router } from "./router";
import { webServer } from "./src/modules/WebServer";

webServer(router)(console.log);
