import { Lazy, Of } from "silentium";

export const notFoundSrc = new Lazy(() => new Of('{"message": "not found"}'));
