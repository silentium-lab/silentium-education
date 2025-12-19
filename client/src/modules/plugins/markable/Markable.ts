import { marked } from "marked";

/**
 * Convert markdown to html
 */
export function Markable(markdown: string): string {
  return marked.parse(markdown).toString();
}
