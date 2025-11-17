import { LateShared, RPCType, SourceType, Tap } from "silentium";

/**
 * Lazy contexts
 */
export function ContextTransport() {
  const cache: Record<string, SourceType> = {};

  return Tap<RPCType>((rpc) => {
    const key = rpc.params?.key ?? "none";

    if (!cache[key]) {
      cache[key] = LateShared();
    }

    if (rpc.method === "get" && rpc.result) {
      cache[key].pipe(rpc.result);
    }

    if (rpc.method === "set") {
      const value = rpc.params?.value ?? "none";
      cache[key].use(value);
    }
  });
}
