import cookie from "cookie";
import { All, Applied, MessageType } from "silentium";
import { Sid } from "./Sid";

export function AuthValidated($headers: MessageType<Record<string, any>>) {
  const $sids = Sid();
  return Applied(All($sids, $headers), ([sids, headers]) => {
    if (!headers.cookie) {
      return false;
    }
    const data = cookie.parse(headers.cookie);
    return sids.includes(String(data.sid));
  });
}
