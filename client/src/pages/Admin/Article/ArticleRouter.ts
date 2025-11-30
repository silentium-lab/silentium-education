import { TemplateRouter } from "@/modules/app/template/TemplateRouter";
import { ArticleConfig } from "@/pages/Admin/Article/ArticleConfig";
import { ArticleEdit } from "@/pages/Admin/Article/ArticleEdit";
import { ArticleList } from "@/pages/Admin/Article/ArticleList";
import { ArticleNew } from "@/pages/Admin/Article/ArticleNew";

export function ArticleRouter() {
  return TemplateRouter(ArticleConfig(), ArticleList, ArticleNew, ArticleEdit);
}
