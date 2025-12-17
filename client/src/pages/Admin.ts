import { Logout } from "@/modules/app/common/Logout";
import { ClickedId } from "@/modules/ClickedId";
import { FromContext } from "@/modules/context/Context";
import { ArticleRouter } from "@/pages/Admin/Article/ArticleRouter";
import { Auth } from "@/pages/Admin/Auth";
import { CategoryRouter } from "@/pages/Admin/Category/CategoryRouter";
import { SectionRouter } from "@/pages/Admin/Section/SectionRouter";
import { $title, $url, Tr } from "@/store";
import { Connected, Filtered, Late, Of } from "silentium";
import { Detached, Polling, Router, Template } from "silentium-components";

export function Admin() {
  $title.use("Админ панель");

  const $localUrl = Detached($url);
  const $error = Filtered(FromContext("error"), (e: any) => e.status === 401);
  const result = Late<string>();

  result.chain(Polling<string>(Auth(), $error));

  const rd = Router(
    $localUrl,
    Of([
      {
        pattern: "^/admin$",
        message: Auth,
      },
      {
        pattern: "^/admin/articles.*$",
        message: ArticleRouter,
      },
      {
        pattern: "^/admin/sections.*$",
        message: SectionRouter,
      },
      {
        pattern: "^/admin/categories.*$",
        message: CategoryRouter,
      },
    ]),
    () => Of("Admin page not found"),
  );

  const $logout = Late();
  const $loggedOut = Polling(Logout(), $logout);
  $loggedOut.then(() => {
    location.href = "/";
  });

  const t = Template(
    (t) => `<div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar Menu -->
      <div class="max-w-34 bg-white shadow-lg flex-1">
        <nav class="mt-4  h-full flex flex-col">
          <a href="/admin/articles" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(Tr("Articles"))}</a>
          <a href="/admin/sections" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(Tr("Sections"))}</a>
          <a href="/admin/categories" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(Tr("Categories"))}</a>
          <a href="/admin/categories" class="${t.var(ClickedId($logout))} block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(Tr("Logout"))}</a>
        </nav>
      </div>
      <div class="flex-1 p-8">
        <div id="admin-content">
          ${t.var(rd)}
        </div>
      </div>
    </div>`,
  );
  result.chain(t);

  return Connected(result, t, rd);
}
