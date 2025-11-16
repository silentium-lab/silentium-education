import { LateShared, RPCType, SourceType, Transport } from "silentium";

/**
 * Lazy contexts
 */
export function ContextTransport() {
  const cache: Record<string, SourceType> = {};

  return Transport<RPCType>((rpc) => {
    const key = rpc.params?.key ?? "none";

    if (!cache[key]) {
      cache[key] = LateShared();
    }

    if (rpc.method === "get" && rpc.result) {
      cache[key].to(rpc.result);
    }

    if (rpc.method === "set") {
      const value = rpc.params?.value ?? "none";
      cache[key].use(value);
    }
  });
}
