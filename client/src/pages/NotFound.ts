import { DataType } from "silentium";
import { titleSrc } from "../store";

export const notFound = (): DataType<string> => {
	return (u) => {
		titleSrc.give("Не найдено");
		u("<div>Not found</div>");
	}
}
