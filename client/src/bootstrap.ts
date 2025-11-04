import { FetchAPITransport } from "@/transports/FetchAPITransport";
import { LateShared, RPC } from "silentium";

RPC.transport.request = FetchAPITransport("http://localhost:4000");

export const $notification = LateShared<{
  type: "error" | "success" | "info";
  content: string;
}>();
