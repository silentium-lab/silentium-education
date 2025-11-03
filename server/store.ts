import { Of, TransportEvent } from "silentium";

export const NotFoundSrc = TransportEvent(() => Of('{"message": "not found"}'));
