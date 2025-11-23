import { All, Applied, Context, MessageType } from "silentium";
import { Record } from "silentium-components";

export function Sid(): MessageType<string[]> {
  return Applied(
    Context(
      Record({
        transport: "db",
        params: Record({
          method: "find",
          collection: "sessions",
          postProcessArgs: [],
          postProcess: "toArray",
        }),
      }),
    ),
    (r: any) => r.map((i: any) => i.sid),
  );
}

export function NewSid($sid: MessageType) {
  return Context(
    Record({
      transport: "db",
      params: Record({
        method: "insertOne",
        collection: "sessions",
        args: All(
          Record({
            sid: $sid,
          }),
          {
            expireAfterSeconds: 3600,
          },
        ),
      }),
    }),
  );
}
