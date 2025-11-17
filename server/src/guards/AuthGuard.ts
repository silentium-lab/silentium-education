import { IncomingMessage } from "http";
import { MessageType, Of, TapMessage } from "silentium";
import { BranchLazy } from "silentium-components";
import { AuthValidated } from "../models/auth/AuthValidated";
import { Headers } from "../modules/request/Headers";

export function AuthGuard(
  $req: MessageType<IncomingMessage>,
  $child: MessageType,
) {
  return BranchLazy(
    AuthValidated(Headers($req)),
    TapMessage(() => $child),
    TapMessage(() =>
      Of({
        status: 401,
        error: "No authrization",
      }),
    ),
  );
}
