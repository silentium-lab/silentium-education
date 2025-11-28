import { SectionConfig } from "@/pages/Admin/Section/SectionConfig";
import { SectionEdit } from "@/pages/Admin/Section/SectionEdit";
import { SectionList } from "@/pages/Admin/Section/SectionList";
import { SectionNew } from "@/pages/Admin/Section/SectionNew";
import { NotFound } from "@/pages/NotFound";
import { $url } from "@/store";
import { Detached, Router } from "silentium-components";

export function SectionRouter() {
  const $localUrl = Detached($url);
  const config = SectionConfig();

  return Router(
    $localUrl,
    [
      {
        pattern: `^${config.path}$`,
        message: SectionList,
      },
      {
        pattern: `^${config.path}/create$`,
        message: SectionNew,
      },
      {
        pattern: String.raw`^${config.path}/.+/$`,
        message: SectionEdit,
      },
    ],
    NotFound,
  );
}
