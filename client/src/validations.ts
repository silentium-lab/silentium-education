import { Tr } from "@/store";
import { Of } from "silentium";
import { Concatenated } from "silentium-components";
import { Required } from "silentium-validation";

export function MinLength(min: number) {
  return (v: string) =>
    v.length > min ||
    Concatenated([Tr("Must be greater than"), Of(min.toString())]);
}

export function WithTranslation(rule: (v: any) => boolean | string) {
  return (v: any) => {
    const result = rule(v);

    if (typeof result === "string") {
      return Tr(result);
    }

    return result;
  };
}

export const RequiredTr = WithTranslation(Required);
