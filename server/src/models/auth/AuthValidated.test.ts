import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { Of } from "silentium";
import { AuthValidated } from "./AuthValidated";
import { Sid } from "./Sid";

vi.mock("./Sid");

const mockSid = Sid as Mock;

describe("AuthValidated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return false when headers have no cookie", async () => {
    mockSid.mockReturnValueOnce(Of(["valid-sid"]));
    const $headers = Of({ cookie: undefined });
    const result = AuthValidated($headers);
    expect(await result).toBe(false);
  });

  it("should return false when cookie has no sid", async () => {
    mockSid.mockReturnValueOnce(Of(["valid-sid"]));
    const $headers = Of({ cookie: "some=value" });
    const result = AuthValidated($headers);
    expect(await result).toBe(false);
  });

  it("should return false when sid is not in valid sids", async () => {
    mockSid.mockReturnValueOnce(Of(["valid-sid"]));
    const $headers = Of({ cookie: "sid=invalid-sid" });
    const result = AuthValidated($headers);
    expect(await result).toBe(false);
  });

  it("should return true when sid is in valid sids", async () => {
    mockSid.mockReturnValueOnce(Of(["valid-sid", "another-sid"]));
    const $headers = Of({ cookie: "sid=valid-sid" });
    const result = AuthValidated($headers);
    expect(await result).toBe(true);
  });

  it("should handle sid as number", async () => {
    mockSid.mockReturnValueOnce(Of(["123"]));
    const $headers = Of({ cookie: "sid=123" });
    const result = AuthValidated($headers);
    expect(await result).toBe(true);
  });
});
