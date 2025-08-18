import { applied, i, InformationType, of, once, shared } from "silentium";

export const button = (): InformationType<string> => {
  const [countSrc, countOwner] = of(1);
  const [sharedCountSrc] = shared(countSrc);
  window["increment"] = () => {
    once(sharedCountSrc)((c) => {
      countOwner(c + 1);
    });
  };
  window["reset"] = () => {
    countOwner(1);
  };

  return applied(sharedCountSrc, (c) => {
    return `
      <button onclick='increment()'>clicked ${c}</button>
      <button onclick='reset()'>reset</button>
    `;
  });
};
