import { CategoriesOfSection } from "@/models/categories/CategoriesOfSection";
import { CategoryArticles } from "@/models/categories/CategoryArticles";
import { SectionArticles } from "@/models/sections/SectionArticles";
import { List } from "@/modules/app/common/List";
import { Tr, TrDynamicValue } from "@/modules/I18n";
import { ListFilled } from "@/modules/list/ListFilled";
import { html } from "@/modules/plugins/lang/html";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import {
  All,
  Applied,
  Computed,
  Context,
  Default,
  Map,
  Shared,
} from "silentium";
import { BranchLazy, Template } from "silentium-components";

export function Documentation() {
  const $lang = Context<string>("lang");
  const $title = Context<string>("title").chain(Tr("Documentation"));
  const $categories = CategoriesOfSection("docs");
  const $url = Context("url");
  const $code = Default<string>(
    Computed(SegmentBetween, $url, "documentation/", "/list"),
    "",
  );
  const $articles = Shared(
    BranchLazy(
      Applied($code, Boolean),
      () => CategoryArticles($code),
      () => SectionArticles("docs"),
    ),
  );
  return Template(
    (t) =>
      html`<div class="article">
        <h1>${t.escaped($title)}</h1>
        <div class="flex gap-4">
          <div class="flex-1 max-w-34">
            ${t.raw(
              List(
                Map($categories, (category: any) => {
                  return Applied(
                    All(category, $lang),
                    ([c, l]) =>
                      html`<div>
                        <a href="/documentation/${c.code}/list">
                          ${TrDynamicValue(c, "title", "$l.title", l)}
                        </a>
                      </div>`,
                  );
                }),
              ),
            )}
          </div>
          <div class="column-right">
            ${t.raw(
              BranchLazy(
                Computed(ListFilled, $articles),
                () =>
                  List(
                    Map($articles, (article: any) => {
                      return Applied(
                        All(article, $lang),
                        ([c, l]) =>
                          html`<div class="mb-2">
                            <h4>
                              <a href="/article/${c.code}/view">
                                ${TrDynamicValue(c, "title", "$l.title", l)}
                              </a>
                            </h4>
                            <p>
                              ${TrDynamicValue(
                                c,
                                "description",
                                "$l.description",
                                l,
                              )}
                            </p>
                          </div>`,
                      );
                    }),
                  ),
                () => Tr("No items"),
              ),
            )}
          </div>
        </div>
      </div>`,
  );
}
