import { applied, InformationType } from "silentium";

export const className = (s: InformationType<string>) =>
  applied(s, (s) => "." + s);
