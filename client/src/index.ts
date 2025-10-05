import { _void } from "silentium";
import { app } from "./components/App";
import { routerSrc } from "./router";

app(routerSrc.value)(_void);
