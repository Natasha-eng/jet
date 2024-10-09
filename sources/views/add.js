import BaseContactForm from "./baseContactForm";

export default class AddCntactForm extends BaseContactForm {
	constructor(app) {
		super(app, {
			title: "Add contact",
			buttonValue: "Add",
		});
	}
}