import { Footer } from "@/chunks/Footer";
import { Header } from "@/chunks/Header";
import { Notifications } from "@/components/Notifications";
import { html } from "@/modules/plugins/lang/html";
import { MountPoint } from "@/modules/render/MountPoint";
import { MessageType, Of } from "silentium";
import { Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Element } from "silentium-web-api";

export function App($route: MessageType<string>) {
  return Render(
    Element(Of("body .app")),
    Template(
      (t) =>
        html`<div class="container mx-auto px-3 h-full flex flex-col">
          <div class="${t.raw(MountPoint(Header()))}"></div>
          <section class="content ${t.raw(MountPoint($route))}"></section>
          <div class="mt-auto ${t.raw(MountPoint(Footer()))}"></div>
          <div class="${t.raw(MountPoint(Notifications()))}"></div>
        </div>`,
    ),
  );
}

// bg-success
