import { Context } from "silentium";

/**
 * Logout from admin panel
 */
export function Logout() {
  return Context("request", {
    method: "post",
    model: "private/logout",
    credentials: "include",
  });
}
