import { ContextType, Late, MessageSourceType } from "silentium";

/**
 * Lazy contexts
 */
export function ContextTransport() {
  const cache: Record<string, MessageSourceType> = {};

  return (context: ContextType) => {
    const key = context.params?.key ?? "none";

    if (!cache[key]) {
      cache[key] = Late();
    }

    if (context.params?.method === "get" && context.result) {
      cache[key].then(context.result);
    }

    if (context.params?.method === "set") {
      const value = context.params?.value ?? "none";
      cache[key].use(value);
    }
  };
}
