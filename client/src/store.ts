import { lateShared, of, sharedSource } from "silentium";
import { memo } from "silentium-components";
import translations from "./data/translations.json";
import { documentTitle } from "./modules/DocumentTitle";
import { historyUrl } from "./modules/HistoryUrl";
import { i18n as I18N } from "./modules/I18n";
import { storageRecord } from "./modules/plugins/storage/StorageRecord";

export const langSrc = sharedSource(storageRecord(of("lang"), "ru"));
export const urlSrc = sharedSource(historyUrl());

export const titleSrc = documentTitle();

export const i18n = I18N(memo(langSrc.value), of(translations));

export const authenticatedSrc = lateShared(true);

export const errorSrc = lateShared();
