import { MessageType, Of } from "silentium";
import { SplitPart } from "./SplitPart";

export function UrlId($url: MessageType<string>) {
  return SplitPart($url, Of("/"), Of(-1));
}
