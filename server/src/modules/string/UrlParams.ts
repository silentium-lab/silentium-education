/**
 * Возможность получить все параметры из урла
 */
export function UrlParams(url: string): Record<string, unknown> {
  return Object.fromEntries(new URL(url).searchParams);
}
