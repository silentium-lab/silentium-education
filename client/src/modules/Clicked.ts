import { Message, MessageType } from "silentium";

/**
 * DOM element click even
 */
export function Clicked($class: MessageType<string>) {
  return Message<Event>((resolve) => {
    let className = ".no-class-of-such-name";
    const handler = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (!target) {
        return;
      }
      if (target.classList.contains(className)) {
        resolve(event);
      }
      const closestElement = target.closest(className);
      if (closestElement) {
        resolve(event);
      }
    };
    $class.then((newClassName) => {
      className = newClassName;
      (handler as any).className = newClassName;
      document.body.addEventListener("click", handler);
    });

    return () => {
      document.body.removeEventListener("click", handler);
    };
  });
}
