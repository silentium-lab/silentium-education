import { DataType, lateShared, of, sharedSource } from "silentium";
import { memo, recordOf } from "silentium-components";
import translations from "./data/translations.json";
import { documentTitle } from "./modules/DocumentTitle";
import { historyUrl } from "./modules/HistoryUrl";
import { i18n as I18N } from "./modules/I18n";
import { storageRecord } from "./modules/plugins/storage/StorageRecord";

(window as any).debug = (name: string, record: Record<string, DataType>) => {
    recordOf(record)(console.log.bind(console, name))
}

// export const langSrc = sharedSource(storageRecord(of("lang"), "ru"));
export const langSrc = {
    value: of('ru'),
    give: () => {}
}

export const urlSrc = sharedSource(historyUrl());

export const titleSrc = documentTitle();

export const i18n = I18N(memo(langSrc.value), of(translations));

export const authenticatedSrc = lateShared(true);

export const errorSrc = lateShared();
