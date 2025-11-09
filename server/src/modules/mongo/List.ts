import { Event, EventType, Of, RPC, TransportType } from "silentium";

export function List<T>(
  collection: string,
  error: TransportType,
): EventType<T[]> {
  return Event((transport) => {
    const rpc = RPC(
      Of({
        method: "find",
        params: {
          collection,
          postProcess: "toArray",
        },
      }),
    );
    rpc.error().event(error);
    rpc.result().event(transport);
  });
}
