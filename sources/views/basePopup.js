import { JetView } from "webix-jet";
import { activities } from "../models/activities";

export default class PopupView extends JetView {

    constructor(app, config) {
        super(app);
        this.grid_config = config;
    }

    config() {

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
                    { template: this.grid_config.title, height: 40, borderless: true, css: "popoUpTitle" },
                    { view: "textarea", label: "Details", name: "Details" },
                    {
                        view: "select",
                        label: "Type",
                        name: "TypeID",
                        options: [
                            { "id": 1, "value": "Master" },
                            { "id": 2, "value": "Release" }
                        ]
                    },
                    {
                        view: "select",
                        label: "Contact",
                        name: "ContactID",
                        options: [
                            { "id": 1, "value": "Master" },
                            { "id": 2, "value": "Release" }
                        ]
                    },
                    {
                        view: "datepicker",
                        name: "DueDate",
                        label: "Date",

                    },
                    {
                        view: "datepicker",
                        label: "Time",
                        name: "DueDate",
                        timepicker: true,
                        format: "%H:%i"

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
                                label: "Cancel",
                                width: 100,
                                click: () => {
                                    this.hideWindow();
                                }
                            },
                            {
                                view: "button",
                                css: "webix_primary",
                                label: this.grid_config.buttonValue,
                                width: 100,
                                click: () => {
                                    if (this.grid_config.type === "add") {
                                        console.log('add', this.grid_config.type)
                                        const formData = this.form.getValues();
                                        console.log('formData 2', formData)
                                        activities.add(formData)
                                    } else if (this.grid_config.type === "edit") {
                                  
                                    }
                                    this.hideWindow();
                                    webix.message(this.grid_config.message);
                                }
                            },
                            {}
                        ]
                    },
                ]

            }
        };
    }

    init() {
        this.form = this.$$("formPopup").getBody();


    }
    showWindow() {
        this.getRoot().show();

    }

    hideWindow() {
        this.getRoot().hide();
    }
}
