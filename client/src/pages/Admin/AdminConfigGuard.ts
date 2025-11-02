import {
  Event,
  TransportDestroyable,
  TransportEvent,
  type EventType,
} from "silentium";
import { BranchLazy } from "silentium-components";
import { backendTransport, hasSettingsSrc } from "../../bootstrap";
import { Configuration } from "./Configuration";

/**
 * Ensure everything configured
 */
export function AdminConfigGuard($child: EventType<string>) {
  return Event<string>((transport) => {
    const backendTransportInstance = TransportDestroyable(backendTransport);
    const r = BranchLazy(
      hasSettingsSrc,
      TransportEvent(() => $child),
      TransportEvent(() => Configuration()),
    );
    r.event(transport);

    return () => {
      backendTransportInstance.destroy();
      r.destroy();
    };
  });
}
