import { statuses } from "../models/statuses";
import SettingsTable from "./settingsTable";

export default class StatusTable extends SettingsTable {
	constructor(app) {
		super(app, {
			collection: statuses,
			button_value: "status",
			default: { Value: "Active", Icon: "check" },
			columns: [
				{
					id: "Value",
					header: "Status",
					editor: "text",
					fillspace: true
				},
				{
					id: "Icon",
					header: "Icon",
					editor: "text",
					template: (obj) => {
						return `<span class="webix_icon wxi-${obj.Icon}"></span>`;
					},
					fillspace: true
				},

				{
					header: "",
					template: "<span class='removeBtn webix_icon wxi-trash'></span>",
				},
			]
		});

	}

	init() {
		this.table = this.$$("settingsTable");
		this.table.parse(statuses);
	}
}