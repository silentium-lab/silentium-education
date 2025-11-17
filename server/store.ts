import { Of, TapMessage } from "silentium";

export const NotFoundSrc = TapMessage(() =>
  Of('{"message": "not found"}'),
);
