import { describe, it, expect } from "vitest";
import { SegmentBetween } from "./SegmentBetween";

describe("SegmentBetween", () => {
  it("should extract segment between from and to markers", () => {
    const url = "https://example.com/api/users/123/posts";
    const result = SegmentBetween(url, "/api/", "/posts");
    expect(result).toBe("users/123");
  });

  it("should extract segment with query parameters", () => {
    const url = "https://example.com/path?param=value&other=test";
    const result = SegmentBetween(url, "path?", "value");
    expect(result).toBe("param=");
  });

  it("should extract segment at the beginning of URL", () => {
    const url = "https://api.example.com/users/456";
    const result = SegmentBetween(url, "https://", "/users");
    expect(result).toBe("api.example.com");
  });

  it("should extract segment at the end of URL", () => {
    const url = "https://example.com/api/data.json";
    const result = SegmentBetween(url, "/api/", ".json");
    expect(result).toBe("data");
  });

  it("should handle adjacent markers", () => {
    const url = "test[from][to]end";
    const result = SegmentBetween(url, "[from]", "[to]");
    expect(result).toBe("");
  });

  it("should throw error when from marker is not found", () => {
    const url = "https://example.com/test";
    expect(() => {
      SegmentBetween(url, "missing", "test");
    }).toThrow("Segment 'from' 'missing' not found in URL");
  });

  it("should throw error when to marker is not found after from", () => {
    const url = "https://example.com/api/test";
    expect(() => {
      SegmentBetween(url, "/api/", "missing");
    }).toThrow("Segment 'to' 'missing' not found after 'from' in URL");
  });

  it("should throw error when to appears before from", () => {
    const url = "https://example.com/to/api/from";
    expect(() => {
      SegmentBetween(url, "/from", "/to");
    }).toThrow("Segment 'to' '/to' not found after 'from' in URL");
  });

  it("should handle special characters in markers", () => {
    const url = "data:start:middle:end:finish";
    const result = SegmentBetween(url, ":start:", ":end:");
    expect(result).toBe("middle");
  });

  it("should handle empty segments", () => {
    const url = "prefix[suffix]";
    const result = SegmentBetween(url, "prefix", "suffix");
    expect(result).toBe("[");
  });
});
