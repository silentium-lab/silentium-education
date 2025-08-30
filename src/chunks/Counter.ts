import { Late, Of, On, Once, OwnerType, Shared, TheInformation } from "silentium";
import { First, RecordOf, Template } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Clicked } from "../modules/Clicked";
import { Id } from "../modules/Id";

export class Counter extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    const countSrc = new Late(1);
    const sharedCountSrc = new Shared(countSrc);
    const incrementIdSrc = new Shared(new Id(new Of("increment")));
    const resetIdSrc = new Shared(new Id(new Of("reset")));

    new On(
      new Clicked(new First(new Elements(new ClassName(incrementIdSrc)))),
      () => {
        new On(new Once(sharedCountSrc), (c) => {
          countSrc.give(c + 1);
        });
      }
    );


    new On(
      new Clicked(new First(new Elements(new ClassName(resetIdSrc)))),
      () => {
        countSrc.give(1);
      }
    );

    new Template(
      `
        <button class="$incrementId">clicked $count</button>
        <button class="$resetId">reset</button>
      `,
      new RecordOf({
        $incrementId: incrementIdSrc,
        $resetId: resetIdSrc,
        $count: sharedCountSrc,
      })
    ).value(o);

    return this;
  }
}
