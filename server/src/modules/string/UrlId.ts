import { EventType, Of } from "silentium";
import { SplitPart } from "./SplitPart";

export function UrlId($url: EventType<string>): EventType<string> {
  return SplitPart($url, Of("/"), Of(-1));
}
