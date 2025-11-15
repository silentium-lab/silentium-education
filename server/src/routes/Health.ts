import { Of } from "silentium";

export function Health() {
  return Of({
    time: Date.now(),
  });
}
