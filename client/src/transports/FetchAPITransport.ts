import { ContextType } from "silentium";

export function FetchAPITransport() {
  return (context: ContextType) => {
    const abortController = new AbortController();
    if (context.params?.abort) {
      context.params.abort.then((abort: boolean) => {
        if (abort) {
          abortController.abort();
        }
      });
    }
    const { baseUrl, credentials, headers, body, query } = context.params ?? {};
    const url = "/" + (context.params?.model ?? "unknown");
    let urlWithQuery: URL;
    try {
      urlWithQuery = new URL(String(url ?? "/"), baseUrl);
    } catch {
      context.error?.(new Error("Invalid URL"));
      return;
    }
    Object.entries(query ?? {}).forEach(([key, value]) =>
      urlWithQuery.searchParams.append(key, String(value)),
    );
    const options: RequestInit = {
      method: context.params?.method ?? "get",
      credentials,
      headers,
      body: (body ? JSON.stringify(body) : undefined) as BodyInit,
      signal: abortController.signal,
    };
    fetch(urlWithQuery.toString(), options)
      .then(async (response) => {
        if (response.status >= 300) {
          return Promise.reject({
            status: response.status,
            response: await response.json(),
          });
        }
        return response.text();
      })
      .then((data) => context.result?.(data))
      .catch((error) => {
        context.error?.(error);
      });
  };
}
