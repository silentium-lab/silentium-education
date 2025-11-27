import { Context } from "silentium";

/**
 * Logout from admin panel
 */
export function Logout() {
  return Context({
    transport: "request",
    params: {
      method: "post",
      model: "private/logout",
      credentials: "include",
    },
  });
}
