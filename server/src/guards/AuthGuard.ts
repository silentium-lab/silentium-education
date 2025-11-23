import { IncomingMessage } from "http";
import { MessageType, Of } from "silentium";
import { BranchLazy } from "silentium-components";
import { AuthValidated } from "../models/auth/AuthValidated";
import { Headers } from "../modules/request/Headers";

export function AuthGuard(
  $req: MessageType<IncomingMessage>,
  $child: MessageType,
) {
  return BranchLazy(
    AuthValidated(Headers($req)),
    () => $child,
    () =>
      Of({
        status: 401,
        error: "No authrization",
      }),
  );
}
