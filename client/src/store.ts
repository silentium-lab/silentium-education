import translations from "@/data/translations.json";
import { DocumentTitle } from "@/modules/DocumentTitle";
import { HistoryUrl } from "@/modules/HistoryUrl";
import { i18n as I18N } from "@/modules/I18n";
import { StorageRecord } from "@/modules/plugins/storage/StorageRecord";
import {
  All,
  Applied,
  type EventType,
  LateShared,
  Of,
  Shared,
  SharedSource,
  Transport,
} from "silentium";
import { Memo } from "silentium-components";

(window as any).debug = (name: string, ...events: EventType[]) => {
  Applied(All(...events.map((e) => Shared(e))), (r) => ({ name, ...r })).event(
    Transport(console.table),
  );
};

export const $lang = SharedSource(StorageRecord(Of("lang"), "ru"));

export const $url = SharedSource(HistoryUrl());

export const $title = DocumentTitle();

export const i18n = I18N(Memo($lang), Of(translations));

export const $authenticated = LateShared(true);

export const $error = LateShared();
