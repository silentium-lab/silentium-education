import { Void } from "silentium";
import { App } from "./components/App";
import { routerSrc } from "./router";

App(routerSrc.event)(Void);
