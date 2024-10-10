import { JetView } from "webix-jet";
import { activities } from "../models/activities";
import { activityTypes } from "../models/activityTypes";
import PopupView from "./basePopup";

export default class ActivitiesData extends JetView {
	config() {
		return activities.waitData.then(() => {
			return {
				rows: [
					{
						view: "datatable",
						localId: "activities-table",
						height: 500,
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

						select: true,
						editable: true,
						scrollX: false,
						onClick: {
							removeBtn:  (ev, id) =>  {
								const activity = this.activityTable.getItem(id);
								webix
									.confirm({
										text: "Deleting cannot be undone. Delete activity?",
									})
									.then(
										function () {
											activities.remove(activity.id);
											webix.message("Activity has been deleted.");
										},
										function () {
											webix.message("Canceled");
										}
									);
								return false;
							},
							editBtn: (ev, id) => {
								const activity = this.activityTable.getItem(id);
								this.Popup.showWindow(activity, true);
							},
						},
					},
					{
						view: "button",
						value: "Add activity",
						css: "webix_primary",
						inputWidth: 200,
						click: () => {
							this.Popup.showWindow(null, true);
						}
					},
					{}

				]
			};
		});
	}
	init() {
		this.activityTable = this.$$("activities-table");
		this.on(activities.data, "onStoreUpdated", () => {
			let contactID = this.getParam("id", true);
			this.activityTable.clearAll();
			this.activityTable.parse(activities.find(a => contactID == a.ContactID));
			
		});
		this.Popup = this.ui(PopupView);
	}


	urlChange() {
		let id = this.getParam("id", true);
		this.activityTable.clearAll();
		this.activityTable.parse(activities.find(a => id == a.ContactID));
	}
}

