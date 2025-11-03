import { Transport } from "silentium";
import { router } from "./router";
import { WebServer } from "./src/modules/WebServer";

WebServer(router).event(Transport(console.log));
