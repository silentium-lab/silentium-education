import { settingsModels } from "@/models/settingsModels";
import { Configuration } from "@/pages/Admin/Configuration";
import { Message, MessageType, TransportMessage } from "silentium";
import { BranchLazy } from "silentium-components";

/**
 * Ensure everything configured
 */
export function AdminConfigGuard($child: MessageType<string>) {
  return Message<string>((transport) => {
    const r = BranchLazy(
      settingsModels.hasSettings(),
      TransportMessage(() => $child),
      TransportMessage(Configuration),
    );
    r.to(transport);

    return () => {
      r.destroy();
    };
  });
}
