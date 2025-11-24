import { Context } from "silentium";

export function FromContext(key: string, def?: any) {
  return Context({
    transport: "context",
    params: {
      method: "get",
      key,
      default: def,
    },
  });
}

export function NewContext(key: string) {
  return (v: any) => {
    Context({
      transport: "context",
      params: {
        method: "set",
        value: v,
        key,
      },
    });
  };
}
