import { Void } from "silentium";
import { App } from "@/components/App";
import { $router } from "@/router";

App($router).then(Void()).catch(console.warn.bind(console, "App error:"));
