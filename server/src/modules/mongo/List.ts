import {
  All,
  Message,
  MessageType,
  Of,
  RPC,
  TapOptional,
  TapType,
} from "silentium";
import { Record } from "silentium-components";

export function List<T>(
  collection: string,
  conditions?: MessageType,
  error?: TapType,
): MessageType<T[]> {
  return Message((transport) => {
    const rpc = RPC(
      Record({
        transport: Of("db"),
        method: Of("find"),
        params: Record({
          collection: Of(collection),
          postProcessArgs: conditions ? All(conditions) : Of([]),
          postProcess: Of("toArray"),
        }),
      }),
    );
    TapOptional(error).wait(rpc.error());
    rpc.result().pipe(transport);
  });
}
