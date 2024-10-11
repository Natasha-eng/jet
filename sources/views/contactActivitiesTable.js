import { activities } from "../models/activities.js";
import { activityTypes } from "../models/activityTypes.js";
import ActivitiesTable from "./activitiesTable.js";


export default class CotnactActivitiesTable extends ActivitiesTable {
	constructor(app) {
		super(app, {
			collection: activities,
			columns: [
				{
					id: "State",
					template: "{common.checkbox()}",
					checkValue: "Close",
					uncheckValue: "Open",
					header: "",
					width: 50
				},
				{
					id: "TypeID",
					header: ["Activity type", { content: "selectFilter" }],
					fillspace: true,
					options: activityTypes,
					sort: "string"
				},
				{
					id: "DueDate",
					header: ["Due date"],
					format: webix.Date.dateToStr("%Y-%m-%d %H:%i"),
					fillspace: true,
					sort: "string"
				},
				{
					id: "Details",
					header: ["Details", { content: "textFilter" }],
					fillspace: true,
					sort: "string"
				},
				{
					id: "edit",
					header: "",
					template: "<span class='editBtn webix_icon wxi-pencil'></span>",
				},
				{
					id: "deleteActivity",
					header: "",
					template: "<span class='removeBtn webix_icon wxi-trash'></span>",
				},
			],
		});
	}
}