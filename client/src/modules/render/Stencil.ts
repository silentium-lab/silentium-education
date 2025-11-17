import {
  All,
  Applied,
  DestroyableType,
  DestroyContainer,
  isDestroyable,
  Local,
  MessageType,
  Of,
  TapType,
} from "silentium";
import { Record, Task, Transaction } from "silentium-components";

/**
 * A template that, when changed, will re-query all its variables
 * to obtain new values. This is important when building an application,
 * as any template change requires recomputing the components from scratch.
 */
export function Stencil($src: MessageType<string> = Of("")) {
  return new StencilImpl($src);
}

class StencilImpl implements MessageType<string>, DestroyableType {
  private dc = DestroyContainer();
  private vars: Record<string, MessageType> = {
    $TPL: Of("$TPL"),
  };

  public constructor(private $src: MessageType<string> = Of("")) {}

  public pipe(transport: TapType<string, null>): this {
    const $vars = Record(this.vars);
    const localsDC = DestroyContainer();
    this.dc.add(localsDC);
    const $actualVars = Transaction(Task($vars, 1), () => {
      localsDC.destroy();
      const vars = Object.fromEntries(
        Object.entries(this.vars).map((entry) => {
          return [entry[0], localsDC.add(entry[1])];
        }),
      );
      return Local(Record(vars));
    });
    Applied(All(this.$src, $actualVars), ([base, vars]) => {
      Object.entries(vars).forEach(([ph, val]) => {
        base = base.replaceAll(ph, String(val));
      });
      return base;
    }).pipe(transport);
    return this;
  }

  public template(value: string) {
    this.$src = Of(value);
  }

  /**
   * Ability to register variable
   * in concrete place Of template
   */
  public var(src: MessageType<string>) {
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
