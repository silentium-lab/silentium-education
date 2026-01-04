import { CategoryArticlesWithMeta } from "@/models/categories/CategoryArticles";
import { List } from "@/modules/app/common/List";
import { html } from "@/modules/plugins/lang/html";
import { ArticleType } from "@/types/ArticleType";
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
        const $articles = Applied(
          Path<ArticleType[]>($categoryArticles, "data", []),
          (items) => items.toSorted((a, b) => a.order - b.order),
        );
        const $categoryTitle = Path<string>(
          $categoryArticles,
          "meta.category.title",
        );
        return html`
          <div class="articles-in-article">
            <h3>${t.escaped($categoryTitle)}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              ${t.raw(
                List(
                  Map($articles, (article: any) => {
                    return Applied(
                      article,
                      (c) =>
                        html`<article class="mb-2">
                          <div class="article-title mb-1">
                            <a href="/article/${c.code}/view"> ${c.title} </a>
                          </div>
                          <p class="text-small">${c.description}</p>
                        </article>`,
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
