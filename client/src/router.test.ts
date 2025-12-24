import { Documentation } from "@/pages/Documentation";
import { ContextChain, ContextOf } from "silentium";
import { describe, expect, it } from "vitest";
import { $router } from "./router";

describe("router", () => {
  it("should route /documentation/silentium/view to Documentation", async () => {
    ContextOf("request").then(
      ContextChain({
        data: {},
      }),
    );
    ContextOf("url").then(ContextChain("/documentation/silentium/view"));
    const page = await $router;
    expect(page).toBe(Documentation);
  });
});
