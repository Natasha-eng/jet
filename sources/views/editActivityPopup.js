import { activities } from "../models/activities";
import PopupView from "./basePopup";

export default class EditPopup extends PopupView {
    constructor(app) {
        super(app, {
            data: activities,
            title: "Edit activity",
            buttonValue: "Edit",
            type: "edit"
        });
    }

    init() {
        this.form = this.$$("formPopup").getBody();
        const master = this.getParentView().$$("activities");

        this.on(master, "onSelectChange", (selection, preserve) => {
            const selecteItem = master.getSelectedItem();
            this.form.setValues(selecteItem)
        });

    }

}