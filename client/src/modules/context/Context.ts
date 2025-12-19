import { Context, Void } from "silentium";

export function FromContext(key: string, def?: any) {
  return Context("context", {
    method: "get",
    key,
    default: def,
  });
}

export function NewContext(key: string) {
  return (v: any) => {
    Context("context", {
      method: "set",
      value: v,
      key,
    }).then(Void());
  };
}
