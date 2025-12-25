import { ArticleListWidget } from "@/modules/render/ArticleListWidget";
import { BlogWidget } from "@/modules/render/BlogWidget";
import { MessageType, Piped } from "silentium";

/**
 * Process widgets on text
 */
export function Widgets($base: MessageType<string>) {
  return Piped($base, ArticleListWidget, BlogWidget);
}
