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
							collection: {
								body: {
									template: "#Value#"
								},
								data: activityTypes
							},
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
							collection: {
								body: {
									template: "#FirstName#"
								},
								data: contacts
							},

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

							activities.remove(id);
							return false;

						}

					}


				},

			]
		}
	}
	init() {
		this.activities = this.$$("activities");
		this.$$("activities").parse(activities).then(() => {

		});


		this.app.setService("state", {
			getState: () => { return this.state },
			setState: (state) => { this.state = state }
		});



		this.on(this.activities, "onSelectChange", (selection, preserve) => {
			const selecteItem = this.activities.getSelectedItem();
			this.app.getService("state").setState(selecteItem);

		});



		activities.waitData.then(() => {
			const firstId = activities.getFirstId();
			if (firstId)
				this.activities.select(firstId);
		})

		this.EditPopup = this.ui(EditPopup);
		this.AddPopup = this.ui(AddPopup);
	}
}