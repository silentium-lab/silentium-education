import { all, applied, i, InformationType, of, once, shared } from "silentium";
import { v4 } from "uuid";
import { id } from "../modules/Id";
import { elements } from "silentium-web-api";
import { first } from "silentium-components";
import { clicked } from "../modules/Clicked";
import { className } from "../modules/ClassName";

export const button = (): InformationType<string> => {
  const [countSrc, countOwner] = of(1);
  const [sharedCountSrc] = shared(countSrc);
  const [incrementIdSrc] = shared(id(i("increment")));
  const [resetIdSrc] = shared(id(i("reset")));
  clicked(first(elements(className(incrementIdSrc))))(() => {
    once(sharedCountSrc)((c) => {
      countOwner(c + 1);
    });
  });
  clicked(first(elements(className(resetIdSrc))))(() => {
    countOwner(1);
  });

  return applied(
    all(sharedCountSrc, incrementIdSrc, resetIdSrc),
    ([count, incrementId, resetId]) => {
      return `
      <button class="${incrementId}">clicked ${count}</button>
      <button class=${resetId}>reset</button>
    `;
    },
  );
};
