import { Tr } from "@/store";
import { MaybeMessage } from "silentium";
import { Branch } from "silentium-components";

export function Published(pub: MaybeMessage<boolean>) {
  return Branch(pub, Tr("Published"), Tr("Not published"));
}
