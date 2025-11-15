import { RPCType, Transport } from "silentium";

export function FetchAPITransport() {
  return Transport<RPCType>((r) => {
    const abortController = new AbortController();
    if (r.params?.abort) {
      r.params.abort.to(
        Transport((abort) => {
          if (abort) {
            abortController.abort();
          }
        }),
      );
    }
    const { baseUrl, credentials, headers, body, query } = r.params ?? {};
    const url = "/" + (r.params?.model ?? "unknown");
    let urlWithQuery: URL;
    try {
      urlWithQuery = new URL(String(url ?? "/"), baseUrl);
    } catch {
      r.error?.use(new Error("Invalid URL"));
      return;
    }
    Object.entries(query ?? {}).forEach(([key, value]) =>
      urlWithQuery.searchParams.append(key, String(value)),
    );
    const options: RequestInit = {
      method: r.method ?? "get",
      credentials,
      headers,
      body: (body ? JSON.stringify(body) : undefined) as BodyInit,
      signal: abortController.signal,
    };
    fetch(urlWithQuery.toString(), options)
      .then((response) => response.text())
      .then((data) => r.result?.use(data))
      .catch((error) => {
        r.error?.use(error);
      });
  });
}
