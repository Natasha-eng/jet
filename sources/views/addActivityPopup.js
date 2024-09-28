import PopupView from "./basePopup";

export default class AddPopup extends PopupView {
	constructor(app) {
		super(app, {
			title: "Add activity",
			buttonValue: "Add",
		});
	}
}