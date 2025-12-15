import { IncomingMessage } from "http";
import { ConstructorType, MessageType, Of } from "silentium";
import { BranchLazy } from "silentium-components";
import { AuthValidated } from "../models/auth/AuthValidated";
import { Headers } from "../modules/request/Headers";

const NoAuthentication = () =>
  Of({
    status: 401,
    error: "No authentication",
  });

export function AuthGuard(
  $req: MessageType<IncomingMessage>,
  $child: ConstructorType<[], MessageType>,
) {
  return BranchLazy(AuthValidated(Headers($req)), $child, NoAuthentication);
}
