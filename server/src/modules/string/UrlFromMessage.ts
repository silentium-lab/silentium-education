import { IncomingMessage } from "http";
import { EventType, Of } from "silentium";
import { Path } from "silentium-components";

export function UrlFromMessage($msg: EventType<IncomingMessage>): EventType<string> {
    return Path($msg, Of('url'));
}
