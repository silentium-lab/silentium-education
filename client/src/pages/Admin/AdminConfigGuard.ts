import { settingsModels } from "@/models/settingsModels";
import { Event, TransportEvent, type EventType } from "silentium";
import { BranchLazy } from "silentium-components";
import { Configuration } from "./Configuration";

/**
 * Ensure everything configured
 */
export function AdminConfigGuard($child: EventType<string>) {
  return Event<string>((transport) => {
    const r = BranchLazy(
      settingsModels.hasSettings(),
      TransportEvent(() => $child),
      TransportEvent(Configuration),
    );
    r.event(transport);

    return () => {
      r.destroy();
    };
  });
}
