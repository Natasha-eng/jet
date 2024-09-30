import { activities } from "../models/activities";
import PopupView from "./basePopup";

export default class EditPopup extends PopupView {
	constructor(app) {
		super(app, {
			data: activities,
			title: "Edit activity",
			buttonValue: "Edit",
			edit: true,
		});
		
	}

	setFromData(selecteItem) {
		const dueData = selecteItem.DueDate;

		const date = new Date(dueData);
		const format = webix.Date.dateToStr("%H:%i");
		const newTimeFormat = format(dueData);

		const newFormData = {
			...selecteItem,
			DueDate: date,
			TimeDate: newTimeFormat,
		};

		this.form.setValues(newFormData);
	}

	init() {
		this.form = this.$$("formPopup").getBody();
	}
}
