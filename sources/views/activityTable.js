import { activityTypes } from "../models/activityTypes";
import SettingsTable from "./settingsTable";

export default class ActivityTable extends SettingsTable {
	constructor(app) {
		super(app, {
			collection: activityTypes,
			button_value: "activity",
			default: { Value: "Meeting", Icon: "eye" },
			columns: [
				{
					id: "Value",
					header: "Activities",
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
		this.table.parse(activityTypes);
	}
}