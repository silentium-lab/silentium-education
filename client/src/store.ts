import translations from "@/data/translations.json";
import { HistoryUrl } from "@/modules/HistoryUrl";
import { i18n as I18N } from "@/modules/I18n";
import { StorageRecord } from "@/modules/plugins/storage/StorageRecord";
import { All, Applied, MessageType, Of, Shared } from "silentium";
import { Memo } from "silentium-components";

(globalThis as any).debug = (name: string, ...messages: MessageType[]) => {
  Applied(All(...messages.map((e) => Shared(e))), (r) => ({
    name,
    ...r,
  })).then(console.table);
};

export const $lang = Shared(StorageRecord(Of("lang"), "ru"));

export const $url = Shared(HistoryUrl());

const i18n = I18N(Memo($lang), Of(translations));
export const Tr = i18n.tr.bind(i18n);
