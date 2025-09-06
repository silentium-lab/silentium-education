import { All, From, OwnerType, TheInformation } from "silentium";
import { authenticatedSrc, urlSrc } from "../store";

export class RoutePrivate extends TheInformation {
    public constructor(
        private baseSrc: TheInformation<string>,
        private loginRoute: string = '/admin'
    ) {
        super(baseSrc);
    }

    public value(o: OwnerType) {
        new All(authenticatedSrc, this.baseSrc).value(
            new From(([auth, content]) => {
                if (!auth) {
                    setTimeout(() => {
                        urlSrc.give(this.loginRoute);
                    })
                } else {
                    o.give(content);
                }
            })
        )
        return this;
    }
}
