import { All, Event, type EventType, On, Shared, type SourceType } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Id } from "../modules/Id";
import { KeyPressed } from "../modules/KeyPressed";

export function Input(valueSrc: SourceType<string>): EventType<string> {
  return Event((transport) => {
    const idSrc = Shared(Id());
    idSrc.event(transport);

    const elSrc = Shared(
      First(Elements<HTMLInputElement>(ClassName(idSrc.event))),
    );

    All(
      elSrc.event,
      valueSrc.event,
    )(([el, value]) => {
      if (el) {
        el.value = value;
      }
    });

    On(KeyPressed<InputEvent>(elSrc.event), (e: InputEvent) => {
      valueSrc.use((e.target as HTMLInputElement).value);
    });
  });
}
