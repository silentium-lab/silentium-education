import { FetchAPITransport } from "@/transports/FetchAPITransport";
import { Applied, LateShared, RPCOf } from "silentium";

Applied(RPCOf("request"), (rpc) => ({
  ...rpc,
  params: {
    ...rpc.params,
    baseUrl: "http://localhost:4000",
  },
})).event(FetchAPITransport());

export const $notification = LateShared<{
  type: "error" | "success" | "info";
  content: string;
}>();
