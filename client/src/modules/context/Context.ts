import { Context } from "silentium";

export function FromContext(key: string, def?: any) {
  return Context({
    transport: "context",
    method: "get",
    params: {
      key,
      default: def,
    },
  });
}

export function NewContext(key: string) {
  return (v: any) => {
    Context({
      transport: "context",
      method: "set",
      params: {
        value: v,
        key,
      },
    });
  };
}
