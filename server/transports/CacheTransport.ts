import { isFilled, RPCType, Tap } from "silentium";

/**
 * Simple memory cache
 * params.key - key
 * params.value - value
 * params.ttl - time to live for value
 */
export function CacheTransport() {
  const cache: Record<string, unknown> = {};

  return Tap<RPCType>((rpc) => {
    const key = rpc.params?.key ?? "none";

    // TODO ttl consider
    if (rpc.method === "get") {
      const value = cache[key];
      if (isFilled(value)) {
        rpc.result?.use(value);
      } else {
        rpc.error?.use(`not found ${key}`);
      }
    }

    if (rpc.method === "post") {
      if (!isFilled(cache[key])) {
        const value = rpc.params?.value ?? "none";
        cache[key] = value;
      } else {
        rpc.error?.use(`already filled ${key}`);
      }
    }

    if (rpc.method === "put") {
      const value = rpc.params?.value ?? "none";
      cache[key] = value;
    }
  });
}
