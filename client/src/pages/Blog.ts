import { CategoriesOfSection } from "@/models/categories/CategoriesOfSection";
import { List } from "@/modules/app/common/List";
import { Tr } from "@/store";
import { Applied, Context, Map } from "silentium";
import { Template } from "silentium-components";

export function Blog() {
  const $title = Context("title").chain(Tr("blog"));
  const $categories = CategoriesOfSection("blog");
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
                  <a href="/blog/${c.code}">
                    ${c.title}
                  </a>
                </div>`,
                );
              }),
            ),
          )}
        </div>
        <div class="column-right">
          articles
        </div>
      </div>
    </div>`,
  );
}
