import { JetView } from "webix-jet";
import StatusTable from "./statusTable";
import ActivityTable from "./activityTable";
import LanguageSetting from "./languageSetting";

export default class Settings extends JetView {
	config() {
		return {
			rows: [
				{
					cols: [
						StatusTable,
						ActivityTable,

					]
				},
				LanguageSetting
			]

		};
	}
}
