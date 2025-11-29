import {
  Configuration,
  ConfigurationBehavior,
} from "@/pages/Admin/Configuration";
import { describe, test, expect } from "vitest";

describe("Configuration.test", () => {
  test("base", async () => {
    const $page = Configuration();
    const v = await $page;
    expect(v).contains("Конфигурирование системы");
  });
});

describe("ConfigurationBehavior", () => {
  test("is a function", () => {
    expect(typeof ConfigurationBehavior).toBe("function");
  });

  test("can be called without throwing", () => {
    expect(() => {
      ConfigurationBehavior();
    }).not.toThrow();
  });

  test("returns object with required reactive properties", () => {
    const result = ConfigurationBehavior();

    expect(result).toHaveProperty("$authData");
    expect(result).toHaveProperty("$regFinish");
    expect(result).toHaveProperty("$regStart");
    expect(result).toHaveProperty("$register");
    expect(result).toHaveProperty("$username");
  });

  test("all reactive properties are defined", () => {
    const result = ConfigurationBehavior();

    expect(result.$authData).toBeDefined();
    expect(result.$regFinish).toBeDefined();
    expect(result.$regStart).toBeDefined();
    expect(result.$register).toBeDefined();
    expect(result.$username).toBeDefined();
  });
});
