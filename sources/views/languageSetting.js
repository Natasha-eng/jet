import { JetView } from "webix-jet";

export default class LanguageSetting extends JetView {
	config() {
		const { getLang, setLang, _ } = this.app.getService("locale");

		return {
			view: "richselect",
			label: _("Choose language"),
			value: getLang(),
			labelWidth: 150,
			options: [
				{ "value": "en" },
				{ "value": "ru" },
			],
			on: {
				onChange: (value) => setLang(value)

			}

		};
	}
} 