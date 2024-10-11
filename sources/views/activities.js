import { JetView } from "webix-jet";
import PopupView from "./basePopup.js";
import AllActivitiesTable from "./allActivitiesTable.js";


export default class DataView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "button",
					value: "Add activity",
					inputWidth: 150,
					css: "webix_primary",
					click: () => {
						this.Popup.showWindow();
					}
				},
				AllActivitiesTable
			]
		};
	}
	init() {
		this.Popup = this.ui(PopupView);
	}
}