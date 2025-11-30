import { Of } from "silentium";

export function ArticleConfig() {
  return Of({
    model: "private/articles",
    path: "/admin/articles",
  });
}
