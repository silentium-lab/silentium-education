import { Of, RPC, Transport } from "silentium";

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
  return Transport((v) => {
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
