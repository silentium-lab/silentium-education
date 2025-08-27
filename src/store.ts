import { Late, Shared } from "silentium";

export const urlSrc = new Late<string>("/about");
export const sharedUrlSrc = new Shared(urlSrc);
