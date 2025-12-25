import { CategoriesOfSection } from "@/models/categories/CategoriesOfSection";
import { CategoryArticles } from "@/models/categories/CategoryArticles";
import { SectionArticles } from "@/models/sections/SectionArticles";
import { List } from "@/modules/app/common/List";
import { SegmentBetween } from "@/modules/string/SegmentBetween";
import { Tr } from "@/store";
import { Applied, Computed, Context, Default, Map } from "silentium";
import { BranchLazy, Template } from "silentium-components";

export function Blog() {
  const $title = Context("title").chain(Tr("blog"));
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
    (t) => `<div class='article'>
      <h1>${t.var($title)}</h1>
      <div class="flex gap-2">
        <div class="flex-1 max-w-34">
          ${t.var(
            List(
              Map($categories, (category: any) => {
                return Applied(
                  category,
                  (c) => `<div>
                    <a href="/blog/${c.code}/list">
                      ${c.title}
                    </a>
                  </div>`,
                );
              }),
            ),
          )}
        </div>
        <div class="column-right">
          ${t.var(
            List(
              Map($articles, (article: any) => {
                return Applied(
                  article,
                  (c) => `<div class="mb-2">
                    <a href="/blog/${c.code}/view">
                      ${c.title}
                    </a>
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
