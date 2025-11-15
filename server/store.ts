import { Of, TransportMessage } from "silentium";

export const NotFoundSrc = TransportMessage(() =>
  Of('{"message": "not found"}'),
);
