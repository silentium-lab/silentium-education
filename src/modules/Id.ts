import { applied, InformationType } from "silentium";
import { v4 } from "uuid";

export const id = (baseSrc: InformationType<string>) => {
  return applied(baseSrc, (base) => base + "_" + v4());
};
