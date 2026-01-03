import { CategoriesOfSection } from "@/models/categories/CategoriesOfSection";
import { CategoryArticles } from "@/models/categories/CategoryArticles";
import { SectionArticles } from "@/models/sections/SectionArticles";
import { List } from "@/modules/app/common/List";
import { html } from "@/modules/plugins/lang/html";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import { Tr } from "@/store";
import { Applied, Computed, Context, Default, Map } from "silentium";
import { BranchLazy, Template } from "silentium-components";

export function Blog() {
  const $title = Context<string>("title").chain(Tr("blog"));
  const $url = Context("url");
  const $categories = CategoriesOfSection("blog");
  const $code = Default<string>(
    Computed(SegmentBetween, $url, "blog/", "/list"),
    "",
  );
  const $articles = BranchLazy(
    Applied($code, Boolean),
    () => CategoryArticles($code),
    () => SectionArticles("blog"),
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
                    category,
                    (c) =>
                      html`<div>
                        <a href="/blog/${c.code}/list"> ${c.title} </a>
                      </div>`,
                  );
                }),
              ),
            )}
          </div>
          <div class="column-right">
            ${t.raw(
              List(
                Map($articles, (article: any) => {
                  return Applied(
                    article,
                    (c) =>
                      html`<div class="mb-2">
                        <h4>
                          <a href="/article/${c.code}/view"> ${c.title} </a>
                        </h4>
                        <p>${c.description}</p>
                      </div>`,
                  );
                }),
              ),
            )}
          </div>
        </div>
      </div>`,
  );
}
