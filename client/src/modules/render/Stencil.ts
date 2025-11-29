import {
  ActualMessage,
  All,
  Applied,
  ConstructorType,
  DestroyableType,
  DestroyContainer,
  isDestroyable,
  isMessage,
  LateShared,
  Local,
  MaybeMessage,
  Message,
  MessageType,
  Of,
  Rejections,
} from "silentium";
import { Record, Task } from "silentium-components";

/**
 * A template that, when changed, will re-query all its variables
 * to obtain new values. This is important when building an application,
 * as any template change requires recomputing the components from scratch.
 */
export function Stencil(
  src: MaybeMessage<string> | ((t: StencilImpl) => string) = "",
) {
  const $src = LateShared<string>();
  if (typeof src === "string" || isMessage(src)) {
    $src.chain(ActualMessage(src));
  }
  const t = new StencilImpl($src);

  if (typeof src === "function") {
    $src.chain(
      Message((r) => {
        r(src(t));
      }),
    );
  }

  return t;
}

class StencilImpl implements MessageType<string>, DestroyableType {
  private dc = DestroyContainer();
  private vars: Record<string, MessageType> = {
    $TPL: Of("$TPL"),
  };
  private rejections = new Rejections();

  public constructor(private $src: MessageType<string> = Of("")) {}

  public then(resolve: ConstructorType<[string]>): this {
    const $vars = Record(this.vars);
    const localsDC = DestroyContainer();
    this.dc.add(localsDC);
    const $actualVars = Task($vars, 1).then(() => {
      // localsDC.destroy();
      const vars = Object.fromEntries(
        Object.entries(this.vars).map((entry) => {
          return [entry[0], localsDC.add(entry[1])];
        }),
      );
      return Local(Record(vars));
    });
    try {
      Applied(All(this.$src, $actualVars), ([base, vars]) => {
        Object.entries(vars).forEach(([ph, val]) => {
          base = base.replaceAll(ph, String(val));
        });
        return base;
      }).then(resolve);
    } catch (e) {
      this.rejections.reject(e);
    }
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
    const hash =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const varName = `$var${hash}`;
    if (isDestroyable(src)) {
      this.dc.add(src);
    }
    this.vars[varName] = src;
    return varName;
  }

  public catch(rejected: ConstructorType<[unknown]>) {
    this.rejections.catch(rejected);
    return this;
  }

  public destroy(): this {
    this.dc.destroy();
    this.rejections.destroy();
    return this;
  }
}
