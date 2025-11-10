import { EventType, Of } from "silentium";

export function Auth(): EventType {
  return Of({
    message: "do auth",
  });
}
