import { All, Any, Applied, MessageType, Of } from "silentium";
import { Session } from "../session/Session";
import cookie from "cookie";

export function AuthValidated($headers: MessageType<Record<string, any>>) {
  const $sessionID = Any(Of("none"), Session(Of("sid")).result());
  return Applied(All($sessionID, $headers), ([sid, headers]) => {
    if (!headers.cookie) {
      return false;
    }
    const data = cookie.parse(headers.cookie);
    return sid === data.sid;
  });
}
