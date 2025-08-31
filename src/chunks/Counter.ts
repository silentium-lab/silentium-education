import { Applied, From, Late, Of, Once, OwnerType, SharedSource, TheInformation } from "silentium";
import { Concatenated, Template } from "silentium-components";
import { Button } from "../components/Button";

export class Counter extends TheInformation<string> {
  public value(o: OwnerType<string>): this {
    const countSrc = new SharedSource(new Late(1));
    const clickedSrc = new SharedSource(new Late());
    const resetSrc = new SharedSource(new Late());

    clickedSrc.value(new From(() => {
      new Once(countSrc).value(new From((v) => {
        countSrc.give(v + 1)
      }))
    }));

    resetSrc.value(new From(() => {
      countSrc.give(1);
    }));

    const t = new Template();
    t.template(
      `<div class="flex gap-1">
        ${t.var(new Button(
          new Concatenated([new Of("clicked "), new Applied(countSrc, String)]),
          "btn",
          clickedSrc
        ))}
        ${t.var(new Button("reset", "btn", resetSrc))}
      </div>`,
    ).value(o);

    return this;
  }
}
