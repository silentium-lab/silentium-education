import { All, Applied, Context, MessageType } from "silentium";
import { Path, Record } from "silentium-components";

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
    (r: any) => r.data.map((i: any) => i.sid),
  );
}

export function NewSid($sid: MessageType) {
  return Path(
    Context<object>(
      Record({
        transport: "db",
        params: Record({
          method: "insertOne",
          collection: "sessions",
          args: All(
            Record({
              sid: $sid,
              createdAt: 1,
            }),
            {
              expireAfterSeconds: 3600,
            },
          ),
        }),
      }),
    ),
    "data",
  );
}
