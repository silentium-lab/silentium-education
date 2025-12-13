import { Applied, Context } from "silentium";

export function Logout() {
  return Applied(
    Context({
      transport: "db",
      params: {
        method: "deleteMany",
        collection: "sessions",
        args: [{}],
      },
    }),
    () => ({ done: true }),
  );
}
