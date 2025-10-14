import { Destructor, type EventType, On, Shared, type SourceType } from "silentium";
import { First } from "silentium-components";
import { Elements } from "silentium-web-api";
import { ClassName } from "../modules/ClassName";
import { Id } from "../modules/Id";
import { Clicked } from "./Clicked";

export const ClickedId = (clickSrc: SourceType<unknown>): EventType<string> => {
	return (u) => {
		const idSrc = Shared(Id());
		idSrc.event(u);

		const elSrc = Shared(First(Elements(ClassName(idSrc.event))));

		const d = Destructor(Clicked(elSrc.event))
		On(d.event, clickSrc.use);

		return () => {
			d.destroy();
		}
	};
};
