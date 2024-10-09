import { activities } from "../models/activities";
import { contacts } from "../models/contacts";
import BaseContactForm from "./baseContactForm";

export default class EditForm extends BaseContactForm {
	constructor(app) {
		super(app, {
			data: activities,
			title: "Edit contact",
			buttonValue: "Edit",
		});

	}

	setFromData(selecteItem) {
		this.form.setValues(selecteItem);
	}

	init() {
		this.form = this.$$("contactForm")
		const id = this.getParam("id", true);
		if (id) {
			const contact = contacts.getItem(id);
			this.form.setValues(contact);
		}
	}
}
