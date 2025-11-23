import "./bootstrap";
import { router } from "./router";
import { WebServer } from "./src/modules/WebServer";

WebServer(router).then(console.log);
