import { JetView } from "webix-jet";
import PopupView from "./basePopup.js";
import AllActivitiesTable from "./allActivitiesTable.js";


export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					cols: [
						{
							view: "button",
							value: _("Add activity"),
							inputWidth: 200,
							css: "webix_primary",
							click: () => {
								this.Popup.showWindow();
							}
						},
					]
				},

				AllActivitiesTable
			]
		};
	}
	init() {
		this.Popup = this.ui(PopupView);
	}
}