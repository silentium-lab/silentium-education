import {
  Event,
  EventType,
  Of,
  RPC,
  TransportOptional,
  TransportType,
} from "silentium";

export function List<T>(
  collection: string,
  conditions?: EventType,
  error?: TransportType,
): EventType<T[]> {
  return Event((transport) => {
    const rpc = RPC(
      Of({
        transport: "db",
        method: "find",
        params: {
          collection,
          conditions,
          postProcess: "toArray",
        },
      }),
    );
    TransportOptional(error).wait(rpc.error());
    rpc.result().event(transport);
  });
}
