import { Applied, Context } from "silentium";

export function Logout() {
  return Applied(
    Context("db", {
      method: "deleteMany",
      collection: "sessions",
      args: [{}],
    }),
    () => ({ done: true }),
  );
}
