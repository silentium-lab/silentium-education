import { Documentation } from "@/pages/Documentation";
import { ArticleView } from "@/pages/ArticleView";
import { Blog } from "@/pages/Blog";
import { Home } from "@/pages/Home";
import { ContextChain, ContextOf } from "silentium";
import { describe, expect, it, beforeEach } from "vitest";
import { $router } from "./router";

// Helper to synchronously read current router target via then
async function currentRoute() {
  return await (new Promise<any>((resolve) => {
    ($router as any).then((v: any) => resolve(v));
  }));
}

describe("router", () => {
  beforeEach(() => {
    ContextOf("request").then(
      ContextChain({
        data: {},
      }),
    );
  });

  it("should route /documentation/silentium/view to Documentation", async () => {
    ContextOf("url").then(ContextChain("/documentation/silentium/view"));
    const page = await currentRoute();
    expect(page).toBe(ArticleView);
  });

  it("should route / to Home", async () => {
    ContextOf("url").then(ContextChain("/"));
    const page = await currentRoute();
    expect(page).toBe(Home);
  });

  it("should route /blog/x/list to Blog", async () => {
    ContextOf("url").then(ContextChain("/blog/x/list"));
    const page = await currentRoute();
    expect(page).toBe(Blog);
  });
});
