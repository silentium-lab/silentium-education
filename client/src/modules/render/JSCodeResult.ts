import { v4 as uuid } from "uuid";

const resultsKey = `examples-result-${uuid()}` as any;

/**
 * Выполнение кода и запись результатов
 */
export async function JSCodeResult(code: string, selector: string) {
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
    code = `${code}
    function render(...args) { window["${resultsKey}"]["${renderKey}"](...args); }`;
    if (result) {
      try {
        const blob = new Blob([code], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        await import(url);
        URL.revokeObjectURL(url);
        result.innerHTML = logs.join("<br>");
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
