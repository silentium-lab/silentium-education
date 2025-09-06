import { Late, Of, SharedSource } from "silentium";
import { Memo } from "silentium-components";
import translations from "./data/translations.json";
import { DocumentTitle } from "./modules/DocumentTitle";
import { HistoryUrl } from "./modules/HistoryUrl";
import { I18n } from "./modules/I18n";
import { StorageRecord } from "./modules/plugins/storage/StorageRecord";

export const langSrc = new SharedSource(new StorageRecord("lang", "ru"));
export const urlSrc = new SharedSource(new HistoryUrl());

export const titleSrc = new DocumentTitle();

export const i18n = new I18n(new Memo(langSrc), new Of(translations));

export const authenticatedSrc = new Late(true);

export const errorSrc = new SharedSource(new Late());
