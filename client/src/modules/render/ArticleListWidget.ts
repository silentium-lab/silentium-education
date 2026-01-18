import { CategoryArticlesWithMeta } from "@/models/categories/CategoryArticles";
import { List } from "@/modules/app/common/List";
import { TrDynamic, TrDynamicValue } from "@/modules/I18n";
import { html } from "@/modules/plugins/lang/html";
import { ArticleType } from "@/types/ArticleType";
import { partial } from "lodash-es";
import { Actual, All, Applied, Context, Map, MaybeMessage } from "silentium";
import { Path, Template } from "silentium-components";

/**
 * Articles widget searches for [articles]
 */
export function ArticleListWidget(_base: MaybeMessage<string>) {
  const $lang = Context<string>("lang");
  const $base = Actual(_base);
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
          Applied(
            $lang,
            partial(TrDynamic, "meta.category.title", "meta.category.$l.title"),
          ),
        );
        return html`
          <div class="articles-in-article">
            <h3>${t.escaped($categoryTitle)}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              ${t.raw(
                List(
                  Map($articles, (article: any) => {
                    return Applied(
                      All(article, $lang),
                      ([c, l]) =>
                        html`<article class="mb-2">
                          <div class="article-title mb-1">
                            <a href="/article/${c.code}/view">
                              ${TrDynamicValue(c, "title", "$l.title", l)}
                            </a>
                          </div>
                          <p class="text-small">
                            ${TrDynamicValue(
                              c,
                              "description",
                              "$l.description",
                              l,
                            )}
                          </p>
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
