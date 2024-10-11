import { JetView } from "webix-jet";
import { activities } from "../models/activities";
import PopupView from "./basePopup";
import CotnactActivitiesTable from "./contactActivitiesTable";

export default class ActivitiesData extends JetView {
	config() {
		return activities.waitData.then(() => {
			return {
				rows: [
					CotnactActivitiesTable,
					{
						view: "button",
						value: "Add activity",
						css: "webix_primary",
						inputWidth: 200,
						click: () => {
							this.Popup.showWindow(null, true);
						}
					},
				]
			};
		});
	}
	init() {
		this.Popup = this.ui(PopupView);
	}
}

