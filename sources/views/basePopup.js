import { JetView } from "webix-jet";
import { activities } from "../models/activities";
import { activityTypes } from "../models/activityTypes";
import { contacts } from "../models/contacts";

export default class PopupView extends JetView {

	config() {
		const _ = this.app.getService("locale")._;
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
						template: "#action#",
						localId: "title",
						height: 40,
						borderless: true,
						css: "popoUpTitle",
					},
					{
						view: "textarea",
						label: _("Details"),
						name: "Details",
						invalidMessage: "Details must be filled in",
					},
					{
						view: "richselect",
						label: _("Type"),
						name: "TypeID",
						options: activityTypes,
						invalidMessage: "Type must be selected",
					},
					{
						view: "richselect",
						localId: "select-contact",
						label: _("Contact"),
						name: "ContactID",
						options: contacts,
						invalidMessage: "Contact must be selected",
					},
					{
						view: "datepicker",
						name: "DueDate",
						label: _("Date"),
					},
					{
						view: "datepicker",
						name: "TimeDate",
						label: _("Time"),
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
								label: _("Cancel"),
								inputWidth: 150,
								click: () => {
									this.hideWindow();
								},
							},
							{
								view: "button",
								localId: "popup-button",
								css: "webix_primary",

								inputWidth: 150,
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
		this._ = this.app.getService("locale")._;
	}
	showWindow(activity, clientMode) {
		
		const titleForm = this.$$("title");
		const buttonForm = this.$$("popup-button");
		const contactOption = this.$$("select-contact");
		let action = this._ ("Add");
		if (activity) {
			action = this._ ("Edit");
			this.setFormData(activity);
		}

		titleForm.setValues({ action });
		buttonForm.setValue(action);

		if (clientMode) {
			contactOption.setValue(this.getParam("id", true));
			contactOption.disable();
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
			webix.message(this._("Activity is updated."));
		} else {
			webix.message(this._("Contact hasn't been changed."));
		}
	}

	addActivity(formData) {
		activities.add(formData);
		this.form.clear();
		webix.message(this._("New activity is added"));
	}

	setFormData(selecteItem) {
		this.form.setValues(selecteItem);
	}
}
