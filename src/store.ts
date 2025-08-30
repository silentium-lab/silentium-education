import { From, Late, Shared, SharedSource } from "silentium";
import { DocumentTitle } from "./modules/DocumentTitle";
import { HistoryUrl } from "./modules/HistoryUrl";
import { I18n } from "./modules/I18n";

export const langSrc = new SharedSource(new Late<string>('ru'));
langSrc.value(new From(console.log))
export const urlSrc = new HistoryUrl();
export const sharedUrlSrc = new Shared(urlSrc);

export const titleSrc = new DocumentTitle();

export const i18n = new I18n(langSrc);
