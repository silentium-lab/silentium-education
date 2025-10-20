import {
  ConstructorDestroyable,
  Destructor,
  type ConstructorType,
  type EventType,
} from "silentium";
import { BranchLazy } from "silentium-components";
import { backendTransport, hasSettingsSrc } from "../../bootstrap";
import { Configuration } from "./Configuration";

/**
 * Ensure everything configured
 */
export function AdminConfigGuard(
  Child: ConstructorType<[], EventType<string>>,
): EventType<string> {
  return (user) => {
    const transport = ConstructorDestroyable(backendTransport);
    const r = Destructor(
      BranchLazy(hasSettingsSrc.event, Child, Configuration),
    );
    r.event(user);

    return () => {
      transport.destroy();
      r.destroy();
    };
  };
}
