import { JetView } from "webix-jet";
import { activities } from "../models/activities";
import { activityTypes } from "../models/activityTypes";
import { contacts } from "../models/contacts";

export default class PopupView extends JetView {
	constructor(app, config) {
		super(app);
		this.grid_config = config;
	}

	config() {
		return {
			view: "popup",
			localId: "formPopup",
			padding: 30,
			modal: true,
			width: 700,
			height: 500,
			position: "center",
			body: {
				view: "form",

				elements: [
					{
						template: this.grid_config.title,
						height: 40,
						borderless: true,
						css: "popoUpTitle",
					},
					{
						view: "textarea",
						label: "Details",
						name: "Details",
						invalidMessage: "Details must be filled in",
					},
					{
						view: "richselect",
						label: "Type",
						name: "TypeID",
						options: activityTypes,
						invalidMessage: "Type must be selected",
					},
					{
						view: "richselect",
						label: "Contact",
						name: "ContactID",
						options: contacts,
						invalidMessage: "Contact must be selected",
					},
					{
						view: "datepicker",
						name: "DueDate",
						label: "Date",
						format: webix.Date.dateToStr("%Y-%m-%d"),
					},
					{
						view: "datepicker",
						name: "TimeDate",
						label: "Time",
						type: "time",
						twelve: false,
						suggest: {
							type: "timeboard",

							body: {
								button: true,
							},
						},
					},
					{
						view: "checkbox",
						name: "State",
						value: "Open",
						checkValue: "Close",
						uncheckValue: "Open",
					},
					{
						cols: [
							{
								view: "button",
								label: "Cancel",
								width: 100,
								click: () => {
									this.form.clearValidation();
									this.hideWindow();
								},
							},
							{
								view: "button",
								css: "webix_primary",
								label: this.grid_config.buttonValue,
								width: 100,
								click: () => {
									const formData = this.form.getValues();
									const isValid = this.form.validate();
									if (isValid) {
										if (this.grid_config.edit) {
											this.editActivity(formData);
										} else {
											this.addActivity(formData);
										}

										this.hideWindow();
									}
								},
							},
							{},
						],
					},
				],

				rules: {
					TypeID: webix.rules.isNotEmpty,
					ContactID: webix.rules.isNotEmpty,
				},
			},
		};
	}

	init() {
		this.form = this.$$("formPopup").getBody();
	}
	showWindow() {
		this.getRoot().show();
	}

	hideWindow() {
		this.getRoot().hide();
	}

	editActivity(formData) {
		if (this.form.isDirty()) {
			this.form.setDirty();
			const newFormData = this.formatDate(formData);

			activities.updateItem(formData.id, newFormData);
			webix.message("Activity is updated.");
		} else {
			webix.message("Contact hasn't been changed.");
		}
	}

	addActivity(formData) {
		const newFormData = this.formatDate(formData);

		activities.add(newFormData);
		this.form.clear();
		webix.message("New activity is added");
	}

	formatDate(formData) {
		const date = new Date(formData.DueDate);
		const time = new Date(formData.TimeDate);

		const hours = time.getHours();
		const minutes = time.getMinutes();

		const newd = date.setHours(hours, minutes);
		const newDate = new Date(newd);

		const format = webix.Date.dateToStr("%Y-%m-%d %H:%i");
		const newFormat = format(newDate);

		const newFormData = {
			...formData,
			DueDate: newFormat,
		};
		return newFormData;
	}
}
