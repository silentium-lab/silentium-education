import { EventType, Of } from "silentium";

export function Health(): EventType {
  return Of({
    time: Date.now(),
  });
}
