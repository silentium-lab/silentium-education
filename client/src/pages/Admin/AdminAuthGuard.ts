import { MessageType } from "silentium";

/**
 * Ensure authenticated
 */
export function AdminAuthGuard($child: MessageType) {
  return $child;
}
