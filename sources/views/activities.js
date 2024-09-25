import { JetView } from "webix-jet";
import { activities } from "../models/activities.js"


export default class DataView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "button",
					value: "Add activity",
					inputWidth: 150,
					css: "webix_primary",
				},
				{
					view: "datatable",
					localId: "activities",
					columns: [
						{ id: "rank", header: "", width: 30 },
						{ id: "TypeID", header: "Activity type", fillspace: true,},
						{ id: "DueDate", header: "Due date", fillspace: true, },
						{ id: "Details", header: "Details", fillspace: true, },
						{ id: "ContactID", header: "Contact", fillspace: true, },
						{ id: "edit", header: "", },
						{ view: "delete", header: "",  },
					],
					select: true,
					editable: true,
					scrollX: false,

					css: "webix_shadow_medium"
				},

			]
		}
	}
	init() {
		this.$$("activities").parse(activities);
	}
}