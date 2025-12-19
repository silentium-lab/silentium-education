import { All, Applied, Context, MessageType } from "silentium";
import { Path, Record } from "silentium-components";

export function Sid(): MessageType<string[]> {
  return Applied(
    Context(
      "db",
      Record({
        method: "find",
        collection: "sessions",
        postProcessArgs: [],
        postProcess: "toArray",
      }),
    ),
    (r: any) => r.data.map((i: any) => i.sid),
  );
}

export function NewSid($sid: MessageType) {
  return Path(
    Context<object>(
      "db",
      Record({
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
    ),
    "data",
  );
}
