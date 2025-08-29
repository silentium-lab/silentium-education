import { Shared } from "silentium";
import { DocumentTitle } from "./modules/DocumentTitle";
import { HistoryUrl } from "./modules/HistoryUrl";

export const urlSrc = new HistoryUrl();
export const sharedUrlSrc = new Shared(urlSrc);

export const titleSrc = new DocumentTitle();
