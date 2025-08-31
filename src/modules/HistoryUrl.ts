import { Late, OwnerType, TheInformation } from "silentium";

/**
 * URL representation associated with the History API
 */
export class HistoryUrl extends TheInformation<string> implements OwnerType<string> {
    private urlSrc = new Late(location.pathname);

    give(value: string): this {
        const state = { page: value, timestamp: Date.now() };
        const title = `Page ${value}`;
        const url = `${value}`;

        history.pushState(state, title, url);
        this.urlSrc.give(value);

        return this;
    }

    value(o: OwnerType<string>): this {
        this.urlSrc.value(o);
        return this;
    }
}
