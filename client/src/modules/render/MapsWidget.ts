import { html } from "@/modules/plugins/lang/html";
import { ActualMessage, Applied, MaybeMessage } from "silentium";

/**
 * Maps widget searches for [map?url=...]
 */
export function MapsWidget(_base: MaybeMessage<string>) {
  const $base = ActualMessage(_base);
  return Applied($base, (base) => {
    return base.replace(/\[map\?url=(.*?)\]/gs, (_, url) => {
      return html`
        <div class="articles-in-article">
          <iframe src="${url}" border="0" height="500" width="100%"></iframe>
        </div>
      `;
    });
  });
}
