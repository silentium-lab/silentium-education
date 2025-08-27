import { On } from "silentium";
import "./assets/common.scss";
import { App } from "./components/App";
import { routerSrc } from "./router";

new On(new App(routerSrc));
