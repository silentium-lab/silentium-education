import { authModels } from "@/models/authModels";
import { Auth } from "@/pages/Admin/Auth";
import { Message, MessageType, TransportMessage } from "silentium";
import { BranchLazy } from "silentium-components";

/**
 * Ensure auth
 */
export function AdminAuthGuard($child: MessageType) {
  return Message((transport) => {
    const r = BranchLazy(
      authModels.hasAuth(),
      TransportMessage(() => $child),
      TransportMessage(Auth),
    );
    r.to(transport);

    return () => {
      r.destroy();
    };
  });
}
