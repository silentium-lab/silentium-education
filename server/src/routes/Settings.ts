import { EventType, Of } from "silentium";

export function Settings(): EventType {
  return Of({
    message: "do Settings",
  });
}
