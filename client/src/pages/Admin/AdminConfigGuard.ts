import { SettingsConfigured } from "@/models/settings/SettingsConfigured";
import { Configuration } from "@/pages/Admin/Configuration";
import { MessageType } from "silentium";
import { BranchLazy } from "silentium-components";

/**
 * Ensure everything configured
 */
export function AdminConfigGuard($child: MessageType<string>) {
  return BranchLazy(SettingsConfigured(), () => $child, Configuration);
}
