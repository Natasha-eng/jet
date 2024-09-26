import { activities } from "../models/activities";
import PopupView from "./basePopup";

export default class AddPopup extends PopupView {
    constructor(app) {
        super(app, {
            title: "Add activity",
            buttonValue: "Add",
            message: "New activity is added",
            type: "add"
        });
    }

    init() {
        this.form = this.$$("formPopup").getBody();
    }
}