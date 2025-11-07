import {
  All,
  Applied,
  DestroyableType,
  DestroyContainer,
  EventType,
  isDestroyable,
  Local,
  LocalEvent,
  Of,
  TransportType,
} from "silentium";
import { RecordOf, Task, Transaction } from "silentium-components";

/**
 * Шаблон, который в случае своего изменения повторно опросит
 * все свои переменные для получения новых значений, это
 * важно в случае построения приложения, чтобы при любом
 * изменении шаблона нужно с нуля пересоздать вычисляемые компоненты
 */
export function Stencil($src: EventType<string> = Of("")) {
  return new StencilEvent($src);
}

class StencilEvent implements EventType<string>, DestroyableType {
  private dc = DestroyContainer();
  private vars: Record<string, EventType> = {
    $TPL: Of("$TPL"),
  };

  public constructor(private $src: EventType<string> = Of("")) {}

  public event(transport: TransportType<string, null>): this {
    const $vars = RecordOf(this.vars);
    let lastLocal: LocalEvent<Record<string, unknown>> | null = null;
    const $actualVars = Transaction(Task($vars, 1), () => {
      if (lastLocal) {
        lastLocal.destroy();
      }
      const vars = Object.fromEntries(
        Object.entries(this.vars).map((entry) => {
          return [entry[0], entry[1]];
        }),
      );
      lastLocal = Local(RecordOf(vars));
      return lastLocal;
    });
    Applied(All(this.$src, $actualVars), ([base, vars]) => {
      Object.entries(vars).forEach(([ph, val]) => {
        base = base.replaceAll(ph, String(val));
      });

      return base;
    }).event(transport);
    return this;
  }

  public template(value: string) {
    this.$src = Of(value);
  }

  /**
   * Ability to register variable
   * in concrete place Of template
   */
  public var(src: EventType<string>) {
    const places = Object.keys(this.vars).length;
    const varName = `$var${places}`;
    if (isDestroyable(src)) {
      this.dc.add(src);
    }
    this.vars[varName] = src;
    return varName;
  }

  public destroy(): this {
    this.dc.destroy();
    return this;
  }
}
