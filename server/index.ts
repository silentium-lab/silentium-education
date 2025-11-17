import { Tap } from "silentium";
import { router } from "./router";
import { WebServer } from "./src/modules/WebServer";
import "./bootstrap";

WebServer(router).pipe(Tap(console.log));
