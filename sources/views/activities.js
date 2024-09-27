import { JetView } from "webix-jet";
import { activities } from "../models/activities.js"
import { activityTypes } from "../models/activityTypes.js";
import { contacts } from "../models/contacts.js";
import AddPopup from "./addActivityPopup.js";
import EditPopup from "./editActivityPopup.js";


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
						this.AddPopup.showWindow();
					}
				},
				{
					view: "datatable",
					localId: "activities",
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
							id: "ContactID",
							localId: "contact",
							header: ["Contact", { content: "selectFilter" }],
							fillspace: true,
							options: contacts,

							sort: "string"
						},
						{
							id: "edit",
							localId: "edit",
							header: "",
							template: "<span class='editBtn webix_icon wxi-pencil'></span>",
						},
						{
							id: "delete",
							header: "",
							template: "<span class='removeBtn webix_icon wxi-trash'></span>",
						},
					],
			
					select: true,
					editable: true,
					scrollX: false,

					css: "webix_shadow_medium",
					onClick: {
						editBtn: (ev, id) => {
							console.log('edit opened')
							this.EditPopup.showWindow();
						},


						removeBtn: function (ev, id) {
							webix
								.confirm({
									text: "Deleting cannot be undone. Delete activity?",
								})
								.then(
									function () {
										activities.remove(id);
										webix.message("Activity has been deleted.");
									},
									function () {
										webix.message("Canceled");
									}
								);
							return false;
						}
					}
				},
			]
		}
	}
	init() {
		this.activities = this.$$("activities");
		this.activities.parse(activities);
		// this.activities.parse(contacts);
		// this.activities.parse(activityTypes);

		activities.waitData.then(() => {
			const firstId = activities.getFirstId();
			if (firstId)
				this.activities.select(firstId);
		})

		this.EditPopup = this.ui(EditPopup);
		this.AddPopup = this.ui(AddPopup);
	}
}