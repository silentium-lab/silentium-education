import { Void } from "silentium";
import { app } from "./components/App";
import { routerSrc } from "./router";

app(routerSrc.event)(Void);
