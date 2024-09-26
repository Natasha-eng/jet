import { activities } from "../models/activities";
import PopupView from "./basePopup";

export default class EditPopup extends PopupView {
    constructor(app) {
        super(app, {
            data: activities,
            title: "Edit activity",
            buttonValue: "Edit",
            message: "Activity is updated",
            type: "edit"
        });
    }

    ready() {
        const param = this.getParam("id")
        console.log('param', param)

    }

    init() {
        this.form = this.$$("formPopup").getBody();

        this.on(this.$$("formPopup"), "onShow", () => {
            const item = this.app.getService("state").getState()
            console.log('pop up showed, item', item)
            this.form.setValues(item)

        })

    }

}