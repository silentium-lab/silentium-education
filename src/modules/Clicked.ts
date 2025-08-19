import { all, i, InformationType } from "silentium";

const fromEvent = (
  emitterSrc: InformationType<any>,
  eventNameSrc: InformationType<string>,
  subscribeMethodSrc: InformationType<string>,
  unsubscribeMethodSrc: InformationType<string> = i(""),
): InformationType => {
  const a = all(
    emitterSrc,
    eventNameSrc,
    subscribeMethodSrc,
    unsubscribeMethodSrc,
  );
  return (o) => {
    const handler = (...args: any[]) => {
      o(args);
    };
    const d = a(([emitter, eventName, subscribe, unsubscribe]) => {
      emitter[subscribe](eventName, handler);
      return () => {
        if (unsubscribe !== undefined) {
          emitter[unsubscribe](eventName, handler);
        }
      };
    });
  };
};

export const clicked = (elSrc: InformationType<HTMLElement>) => {
  return fromEvent(
    elSrc,
    i("click"),
    i("addEventListener"),
    i("removeEventListener"),
  );
};
