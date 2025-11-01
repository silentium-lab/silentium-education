import {
  Applied,
  type EventType,
  LateShared,
  Of,
  SharedSource,
  Transport,
} from "silentium";
import { Memo, RecordOf } from "silentium-components";
import translations from "./data/translations.json";
import { DocumentTitle } from "./modules/DocumentTitle";
import { HistoryUrl } from "./modules/HistoryUrl";
import { i18n as I18N } from "./modules/I18n";
import { StorageRecord } from "./modules/plugins/storage/StorageRecord";

(window as any).debug = (name: string, record: Record<string, EventType>) => {
  Applied(RecordOf(record), (r) => ({ name, ...r })).event(
    Transport(console.table),
  );
};

export const langSrc = SharedSource(StorageRecord(Of("lang"), "ru"));

export const urlSrc = SharedSource(HistoryUrl());

export const titleSrc = DocumentTitle();

export const i18n = I18N(Memo(langSrc), Of(translations));

export const authenticatedSrc = LateShared(true);

export const errorSrc = LateShared();
