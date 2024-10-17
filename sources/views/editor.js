import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import { statuses } from "../models/statuses";

export default class ContactForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "form",
			localId: "contactForm",
			padding: 30,
			elements: [

				{
					template: "#action#",
					localId: "contact-form",
					height: 40,
					borderless: true,
					css: "popoUpTitle",
				},

				{
					cols: [
						//col1
						{

							rows: [

								{
									view: "text",
									label: _("First name"),
									name: "FirstName",
									invalidMessage: "First name must be filled in",
								},
								{
									view: "text",
									label: _("Last name"),
									name: "LastName",
									invalidMessage: "Last name must be selected",
								},
								{
									view: "datepicker",
									name: "StartDate",
									label: _("Joining date"),
								},
								{
									view: "richselect",
									label: _("Status"),
									name: "StatusID",
									options: {
										body: {
											template: "#Value#"
										},
										data: statuses,
									},
									invalidMessage: "Contact must be selected",
								},
								{
									view: "text",
									label: _("Job"),
									name: "Job",
									invalidMessage: "Job name must be selected",
								},
								{
									view: "text",
									label: _("Company"),
									name: "Company",
									invalidMessage: "Company name must be selected",
								},
								{
									view: "text",
									label: _("Website"),
									name: "Website",
									invalidMessage: "Website name must be selected",
								},
								{
									view: "text",
									label: _("Address"),
									name: "Address",
									invalidMessage: "Address name must be selected",
								},

							]

						},

						//col2
						{
							rows: [

								{
									view: "text",
									label: _("Email"),
									name: "Email",

								},
								{
									view: "text",
									label: _("Skype"),
									name: "Skype",

								},
								{
									view: "text",
									label: _("Phone"),
									name: "Phone",

								},

								{
									view: "datepicker",
									name: "Birthday",
									label: _("Birthday"),
								},

							]
						},

					]
				},

				{
					cols: [
						{
							view: "button",
							label: _("Cancel"),
							width: 150,
							click: () => {
								this.show("../clientInfo");
								this.form.clearValidation();
							},
						},
						{
							view: "button",
							localId: "contact-button",
							css: "webix_primary",
							width: 150,
							click: () => {
								const formData = this.form.getValues();
								const isValid = this.form.validate();
								if (isValid) {
									if (formData.id) {
										this.editContact(formData);
									} else {
										this.addContact(formData);
									}

								}
							},
						},
						{}
					],
				},
				{}
			],

			rules: {
				StatusID: webix.rules.isNotEmpty,
				FirstName: webix.rules.isNotEmpty,
				LastName: webix.rules.isNotEmpty,
			},
		};

	}

	init() {
		this.form = this.$$("contactForm");
		this._ = this.app.getService("locale")._;
	}

	showForm(mode, contactId) {
		const formTitle = this.$$("contact-form");
		const formButton = this.$$("contact-button");

		let action = this._("Add");
		if (contactId && mode === "edit") {
			const contact = contacts.getItem(contactId);
			action = this._("Edit");
			this.setFormData(contact);
		}

		formTitle.setValues({ action });
		formButton.setValue(action);
	}

	hideForm() {
		this.form.clearValidation();
		this.form.clear();
		this.form.hide();
	}

	setFormData(selectedItem) {
		this.form.setValues(selectedItem);
	}


	editContact(formData) {
		if (this.form.isDirty()) {
			contacts.updateItem(formData.id, formData);
			webix.message(this._("Contact is updated."));
		} else {
			webix.message(this._("Contact hasn't been changed."));
		}
		this.show("../clientInfo");
	}

	addContact(formData) {
		contacts.waitSave(() => {
			contacts.add(formData);
		}).then((data) => {
			this.show(`../../contacts?id=${data.id}/clientInfo`);
			webix.message(this._("New activity is added"));
		});
	}

	urlChange() {
		const contactId = this.getParam("id", true);
		const mode = this.getParam("mode");

		this.showForm(mode, contactId);
	}
}
