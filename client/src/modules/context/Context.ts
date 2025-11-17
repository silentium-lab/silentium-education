import { Of, RPC, Tap } from "silentium";

export function Context(key: string, def?: any) {
  return RPC(
    Of({
      transport: "context",
      method: "get",
      params: {
        key,
        default: def,
      },
    }),
  ).result();
}

export function NewContext(key: string) {
  return Tap((v) => {
    RPC(
      Of({
        transport: "context",
        method: "set",
        params: {
          value: v,
          key,
        },
      }),
    ).result();
  });
}
