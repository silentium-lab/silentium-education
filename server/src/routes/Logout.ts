import { Applied, Context, Message } from "silentium";

export function Logout() {
  return Message((resolve, reject) => {
    Applied(
      Context({
        transport: "db",
        params: {
          method: "deleteMany",
          collection: "sessions",
          args: [{}],
        },
      }).catch(reject),
      () => ({ done: true }),
    ).then(resolve);
  });
}
