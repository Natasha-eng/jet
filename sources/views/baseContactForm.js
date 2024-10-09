import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import { statuses } from "../models/statuses";

export default class BaseContactForm extends JetView {
	constructor(app, config) {
		super(app);
		this.table_config = config;
	}

	config() {
		return {
			type: "form",
			view: "form",
			localId: "contactForm",
			padding: 30,
			elements: [

				{
					template: this.table_config.title,
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
									label: "First name",
									name: "FirstName",
									invalidMessage: "First name must be filled in",
								},
								{
									view: "text",
									label: "Last name",
									name: "LastName",
									invalidMessage: "Last name must be selected",
								},
								{
									view: "datepicker",
									name: "StartDate",
									label: "Joining date",
								},
								{
									view: "richselect",
									label: "Status",
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
									label: "Job",
									name: "Job",
									invalidMessage: "Job name must be selected",
								},
								{
									view: "text",
									label: "Company",
									name: "Company",
									invalidMessage: "Company name must be selected",
								},
								{
									view: "text",
									label: "Website",
									name: "Website",
									invalidMessage: "Website name must be selected",
								},
								{
									view: "text",
									label: "Address",
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
									label: "Email",
									name: "Email",

								},
								{
									view: "text",
									label: "Skype",
									name: "Skype",

								},
								{
									view: "text",
									label: "Phone",
									name: "Phone",

								},

								{
									view: "datepicker",
									name: "Birthday",
									label: "Birthday",
								},

							]
						},

					]
				},

				{
					cols: [
						{
							view: "button",
							label: "Cancel",
							width: 100,
							click: () => {
								this.show("../clientInfo");
								this.form.clearValidation();
							},
						},
						{
							view: "button",
							css: "webix_primary",
							label: this.table_config.buttonValue,
							width: 100,
							click: () => {
								const formData = this.form.getValues();
								const isValid = this.form.validate();
								// if (isValid) {
								if (formData.id) {
									this.editContact(formData);
								} else {
									this.addContact(formData);
								}

								// }
							},
						},
						{}
					],
				},
				{}
			],

			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty,
			},
		};

	}

	init() {
		this.form = this.$$("contactForm");
	}


	editContact(formData) {
		if (this.form.isDirty()) {
			contacts.updateItem(formData.id, formData);
			webix.message("Contact is updated.");
		} else {
			webix.message("Contact hasn't been changed.");
		}
		this.show("../clientInfo");
	}

	addContact(formData) {
		contacts.waitSave(() => {
			contacts.add(formData);
		}).then((data) => {
			this.show(`../../contacts?id=${data.id}/clientInfo`);
			this.form.clear();
			webix.message("New activity is added");
		});

	}

}
