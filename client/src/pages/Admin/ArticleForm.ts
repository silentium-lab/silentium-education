import { OwnerType, SourceType, TheInformation } from "silentium";
import { Part, RecordOf, Template } from "silentium-components";
import { Input } from "../../components/Input";
import { Mustache } from "../../modules/plugins/mustache/Mustache";
import { ArticleType } from "../../types/ArticleType";

export class ArticleForm extends TheInformation<string> {
    public constructor(private formSrc: SourceType<ArticleType>) {
        super(formSrc);
    }

    value(o: OwnerType<string>): this {
		const formModels = {
			title: new Part(this.formSrc, 'title'),
			content: new Part(this.formSrc, 'content')
		};

		const t = new Template();
		t.template(`<div class="mb-2">
			<div class="mb-2">
				<div class="font-bold">Название: </div>
				<input class="${t.var(new Input(formModels.title))} border-1 p-2 rounded-sm w-full" />
			</div>
			<div class="mb-2">
				<div class="font-bold">Содержимое: </div>
				<textarea rows="20" class="${t.var(new Input(formModels.content))} border-1 p-2 rounded-sm w-full"></textarea>
			</div>
		</div>
		`).value(o);
        return this;
    }
}
