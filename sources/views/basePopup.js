import { JetView } from "webix-jet";
import { activities } from "../models/activities";
import { activityTypes } from "../models/activityTypes";
import { contacts } from "../models/contacts";

export default class PopupView extends JetView {

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
						template: (obj) => `${obj.mode == 1 ? "Edit" : "Add"}`,
						localId: "title",
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
									this.hideWindow();
								},
							},
							{
								view: "button",
								localId: "popup-button",
								css: "webix_primary",

								width: 100,
								click: () => {

									const isValid = this.form.validate();
									if (isValid) {
										const formData = this.form.getValues();
										if (formData.id) {
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
	showWindow(activity) {
		const titleForm = this.$$("title");
		const buttonForm = this.$$("popup-button");
		if (activity) {
			titleForm.setValues({ mode: 1 });
			buttonForm.setValue("Edit");
			this.setFormData(activity);
		} else {
			titleForm.setValues({ mode: 0 });
			buttonForm.setValue("Add");
		}

		this.getRoot().show();
	}

	hideWindow() {
		this.form.clearValidation();
		this.form.clear();
		this.getRoot().hide();
	}

	editActivity(formData) {
		if (this.form.isDirty()) {
			activities.updateItem(formData.id, formData);
			webix.message("Activity is updated.");
		} else {
			webix.message("Contact hasn't been changed.");
		}
	}

	addActivity(formData) {
		activities.add(formData);
		this.form.clear();
		webix.message("New activity is added");
	}

	setFormData(selecteItem) {
		this.form.setValues(selecteItem);
	}
}
