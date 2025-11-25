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
    const method = context.params?.method ?? "none";

    // TODO ttl consider
    if (method === "get") {
      const value = cache[key];
      if (isFilled(value)) {
        context.result?.(value);
      } else {
        context.error?.(`not found ${key}`);
      }
    }

    if (method === "post") {
      if (!isFilled(cache[key])) {
        const value = context.params?.value ?? "none";
        cache[key] = value;
      } else {
        context.error?.(`already filled ${key}`);
      }
    }

    if (method === "put") {
      const value = context.params?.value ?? "none";
      cache[key] = value;
    }
  };
}
