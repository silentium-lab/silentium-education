import { All, Applied, MessageType, Of, RPC } from "silentium";
import { Record } from "silentium-components";

export function Sid(): MessageType<string[]> {
  return Applied(
    RPC(
      Record({
        transport: "db",
        method: "find",
        params: Record({
          collection: "sessions",
          postProcessArgs: Of([]),
          postProcess: Of("toArray"),
        }),
      }),
    ).result(),
    (r: any) => r.map((i: any) => i.sid),
  );
}

export function NewSid($sid: MessageType) {
  return RPC(
    Record({
      transport: "db",
      method: "insertOne",
      params: Record({
        collection: "sessions",
        args: All(
          Record({
            sid: $sid,
          }),
          Record({
            expireAfterSeconds: 3600,
          }),
        ),
      }),
    }),
  );
}
