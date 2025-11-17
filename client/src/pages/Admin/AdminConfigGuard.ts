import { settingsModels } from "@/models/settingsModels";
import { Configuration } from "@/pages/Admin/Configuration";
import { MessageType, TapMessage } from "silentium";
import { BranchLazy } from "silentium-components";

/**
 * Ensure everything configured
 */
export function AdminConfigGuard($child: MessageType<string>) {
  return BranchLazy(
    settingsModels.hasSettings(),
    TapMessage(() => $child),
    TapMessage(Configuration),
  );
}
