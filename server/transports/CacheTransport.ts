import { ContextType, isFilled } from "silentium";

/**
 * Simple memory cache
 * params.key - key
 * params.value - value
 * params.ttl - time to live for value
 */
export function CacheTransport() {
  const cache: Record<string, unknown> = {};

  return (context: ContextType) => {
    const key = context.params?.key ?? "none";

    // TODO ttl consider
    if (context.method === "get") {
      const value = cache[key];
      if (isFilled(value)) {
        context.result?.(value);
      } else {
        context.error?.(`not found ${key}`);
      }
    }

    if (context.method === "post") {
      if (!isFilled(cache[key])) {
        const value = context.params?.value ?? "none";
        cache[key] = value;
      } else {
        context.error?.(`already filled ${key}`);
      }
    }

    if (context.method === "put") {
      const value = context.params?.value ?? "none";
      cache[key] = value;
    }
  };
}
