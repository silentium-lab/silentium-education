import { CategoryArticlesWithMeta } from "@/models/categories/CategoryArticles";
import { List } from "@/modules/app/common/List";
import { html } from "@/modules/plugins/lang/html";
import { ActualMessage, Applied, Map, MaybeMessage } from "silentium";
import { Path, Template } from "silentium-components";

/**
 * Articles widget searches for [articles]
 */
export function ArticleListWidget(_base: MaybeMessage<string>) {
  const $base = ActualMessage(_base);
  return Applied($base, (base) => {
    return Template((t) =>
      base.replace(/\[articles\?category=(.*?)\]/gs, (_, code) => {
        const $categoryArticles = CategoryArticlesWithMeta(code);
        const $articles = Path<unknown[]>($categoryArticles, "data");
        const $categoryTitle = Path<string>(
          $categoryArticles,
          "meta.category.title",
        );
        return html`
          <div class="articles-in-article">
            <h3>${t.escaped($categoryTitle)}</h3>
            <div class="grid grid-cols-3 gap-2">
              ${t.raw(
                List(
                  Map($articles, (article: any) => {
                    return Applied(
                      article,
                      (c) =>
                        html`<div class="mb-2">
                          <a href="/article/${c.code}/view"> ${c.title} </a>
                        </div>`,
                    );
                  }),
                ),
              )}
            </div>
          </div>
        `;
      }),
    );
  });
}
