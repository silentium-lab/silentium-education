import { All, Applied, From, Late, Of, Once, OwnerType, Shared, TheInformation } from "silentium";
import { Id } from "../modules/Id";
import { Elements, Log } from "silentium-web-api";
import { First } from "silentium-components";
import { Clicked } from "../modules/Clicked";
import { ClassName } from "../modules/ClassName";

export class Button extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    const countSrc = new Late(1);
    const sharedCountSrc = new Shared(countSrc);
    const incrementIdSrc = new Shared(new Id(new Of("increment")));
    const resetIdSrc = new Shared(new Id(new Of("reset")));

    new Clicked(new First(new Elements(new ClassName(incrementIdSrc)))).value(new From(() => {
      new Once(sharedCountSrc).value(new From((c) => {
        countSrc.owner().give(c + 1);
      }));
    }));

    new Clicked(new First(new Elements(new ClassName(resetIdSrc)))).value(new From(() => {
      countSrc.owner().give(1);
    }));

    new Applied(
      new All(sharedCountSrc, incrementIdSrc, resetIdSrc),
      ([count, incrementId, resetId]) => {
        return `
        <button class="${incrementId}">clicked ${count}</button>
        <button class=${resetId}>reset</button>
      `;
      },
    ).value(o);

    return this;
  }
}
