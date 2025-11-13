import {
  All,
  Event,
  EventType,
  Of,
  RPC,
  TransportOptional,
  TransportType,
} from "silentium";
import { RecordOf } from "silentium-components";

export function List<T>(
  collection: string,
  conditions?: EventType,
  error?: TransportType,
): EventType<T[]> {
  return Event((transport) => {
    const rpc = RPC(
      RecordOf({
        transport: Of("db"),
        method: Of("find"),
        params: RecordOf({
          collection: Of(collection),
          postProcessArgs: conditions ? All(conditions) : Of([]),
          postProcess: Of("toArray"),
        }),
      }),
    );
    TransportOptional(error).wait(rpc.error());
    rpc.result().event(transport);
  });
}
