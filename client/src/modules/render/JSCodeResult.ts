/**
 * Выполнение кода и запись результатов
 */
export async function JSCodeResult(code: string, selector: string) {
  try {
    const result = document.querySelector(selector);
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.join(""));
      originalLog(...args);
    };
    if (result) {
      try {
        const blob = new Blob([code], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        await import(url);
        URL.revokeObjectURL(url);
        result.innerHTML = logs.join("");
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
