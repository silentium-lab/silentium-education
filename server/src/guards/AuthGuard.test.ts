import { describe, it, expect, vi, Mock, afterEach } from "vitest";
import { IncomingMessage } from "http";
import { Of } from "silentium";
import { AuthGuard } from "./AuthGuard";
import { AuthValidated } from "../models/auth/AuthValidated";

vi.mock("../models/auth/AuthValidated");
vi.mock("../modules/request/Headers");

const mockAuthValidated = AuthValidated as Mock;

describe("AuthGuard", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should return child when authenticated", async () => {
    const mockReq = new IncomingMessage({} as any);

    mockAuthValidated.mockReturnValueOnce(Of(true));

    const $child = Of({ message: "child content" });
    const result = AuthGuard(mockReq as any, () => $child);

    expect(mockAuthValidated).toHaveBeenCalledTimes(1);
    expect(await result).toEqual(await $child);
  });

  it("should return 401 error when not authenticated", async () => {
    const mockReq = new IncomingMessage({} as any);

    mockAuthValidated.mockReturnValueOnce(Of(false));

    const $child = Of({ message: "child content" });
    const result = AuthGuard(mockReq as any, () => $child);

    expect(mockAuthValidated).toHaveBeenCalledTimes(1);
    expect(await result).toEqual({
      status: 401,
      error: "No authentication",
    });
  });
});
