import { html } from "@/modules/plugins/lang/html";
import { v4 as uuid } from "uuid";

const resultsKey = `examples-result-${uuid()}` as any;

/**
 * Isolated in iframe js execution
 */
export function JSIsolatedCodeResult(code: string, selector: string) {
  try {
    const result = document.querySelector(selector);
    const logs: string[] = [];
    const originalLog = console.log;
    const customLog = (...args: any[]) => {
      logs.push(args.join(""));
      originalLog(...args);
    };
    console.log = customLog;
    if (!window[resultsKey]) {
      window[resultsKey] = {} as any;
    }
    const renderKey = uuid();
    (window[resultsKey] as any)[renderKey] = (...args: any[]) => {
      if (result) {
        result.innerHTML = args.join("");
      }
    };
    if (result) {
      try {
        createIframeAndRun(code, result);
      } catch (e) {
        result.innerHTML = "Error: " + e.message;
      }
    } else {
      console.warn("Error: not found by selector " + selector);
    }
    console.log = originalLog;
  } catch (e) {
    console.log(e);
  }
}

function createIframeAndRun(jsCode: string, result: Element) {
  const iframe = document.createElement("iframe");

  iframe.style.width = "100%";
  iframe.style.height = "500px";

  iframe.srcdoc = html`
    <!DOCTYPE html>
    <html>
      <head>
        <script type="importmap">
          {
            "imports": {
              "morphdom": "https://unpkg.com/morphdom@latest/dist/morphdom-esm.js",
              "uuid": "https://unpkg.com/uuid@latest/dist/index.js",
              "silentium": "https://unpkg.com/silentium@latest/dist/silentium.mjs",
              "silentium-ui": "https://unpkg.com/silentium-ui@latest/dist/silentium-ui.mjs",
              "silentium-components": "https://unpkg.com/silentium-components@latest/dist/silentium-components.mjs",
              "silentium-morphdom": "https://unpkg.com/silentium-morphdom@latest/dist/silentium-morphdom.mjs",
              "silentium-web-api": "https://unpkg.com/silentium-web-api@latest/dist/silentium-web-api.mjs"
            }
          }
        </script>
      </head>
      <body>
        <div id="app">Building frame content...</div>
        <script>
          function render(text) {
            window.app.innerHTML = text;
          }
        </script>
        <script type="module">
          ${jsCode};
        </script>
      </body>
    </html>
  `;

  result.innerHTML = "";
  result.appendChild(iframe);
}
