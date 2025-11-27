import { $notification } from "@/bootstrap";
import { Logout } from "@/modules/app/common/Logout";
import { ClickedId } from "@/modules/ClickedId";
import { FromContext } from "@/modules/context/Context";
import { ArticleEdit } from "@/pages/Admin/ArticleEdit";
import { ArticleNew } from "@/pages/Admin/ArticleNew";
import { Articles } from "@/pages/Admin/Articles";
import { Auth } from "@/pages/Admin/Auth";
import { $title, $url, i18n } from "@/store";
import { Filtered, LateShared, Message, Of, Void } from "silentium";
import {
  Constant,
  Detached,
  Polling,
  Router,
  Shot,
  Template,
} from "silentium-components";

export function Admin() {
  return Message<string>((transport) => {
    $title.use("Админ панель");

    const $localUrl = Detached($url);
    const $error = Filtered(FromContext("error"), (e: any) => e.status === 401);

    Shot<string>(Auth(), $error).then(transport);

    const rd = Router(
      $localUrl,
      Of([
        {
          pattern: "^/admin$",
          message: Auth,
        },
        {
          pattern: "^/admin/articles$",
          name: "list",
          message: Articles,
        },
        {
          pattern: "^/admin/articles/create$",
          name: "create",
          message: ArticleNew,
        },
        {
          pattern: String.raw`^/admin/articles/.+/$`,
          name: "edit",
          message: ArticleEdit,
        },
      ]),
      () => Of("Admin not found"),
    );

    const $logout = LateShared();
    $logout.then(console.log);
    const $loggedOut = Polling(Logout(), $logout);
    $loggedOut.then(() => location.reload());

    const t = Template();
    t.template(`<div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar Menu -->
      <div class="max-w-34 bg-white shadow-lg flex-1">
        <nav class="mt-4  h-full flex flex-col">
          <a href="/admin/articles" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(i18n.tr("Articles"))}</a>
          <a href="/admin/sections" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(i18n.tr("Sections"))}</a>
          <a href="/admin/categories" class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(i18n.tr("Categories"))}</a>
          <a href="/admin/categories" class="${t.var(ClickedId($logout))} block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900">${t.var(i18n.tr("Logout"))}</a>
        </nav>
      </div>
      <div class="flex-1 p-8">
        <div id="admin-content">
          ${t.var(rd)}
        </div>
      </div>
    </div>`);
    t.then(transport);

    return function AdminDestroy() {
      rd.destroy();
    };
  });
}
