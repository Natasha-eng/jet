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
                    {
                        template: this.grid_config.title,
                        height: 40,
                        borderless: true,
                        css: "popoUpTitle"
                    },
                    {
                        view: "textarea",
                        label: "Details",
                        name: "Details",
                        invalidMessage: "Details must be filled in",
                    },
                    {
                        view: "select",
                        label: "Type",
                        name: "TypeID",
                        options: [
                            { "id": 1, "value": "Master" },
                            { "id": 2, "value": "Release" }
                        ],
                        invalidMessage: "Type must be selected",
                    },
                    {
                        view: "select",
                        label: "Contact",
                        name: "ContactID",
                        options: [
                            { "id": 1, "value": "Master" },
                            { "id": 2, "value": "Release" }
                        ],
                        invalidMessage: "Contact must be selected",
                    },
                    {
                        view: "datepicker",
                        name: "DueDate",
                        label: "Date",
                        format: webix.Date.dateToStr("%Y-%m-%d"),
                    },
                    {
                        view: "datepicker",
                        name: "TimeDate",
                        label: "Time",
                        type: "time",
                        suggest: {
                            type: "timeboard",
                            body: {
                                button: true
                            }
                        }
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
                                    this.form.clearValidation();
                                    this.hideWindow();
                                }
                            },
                            {
                                view: "button",
                                css: "webix_primary",
                                label: this.grid_config.buttonValue,
                                width: 100,
                                click: () => {
                                    const formData = this.form.getValues();
                                    const isValid = this.form.validate();
                                    if (isValid) {
                                        if (this.grid_config.type === "add") {
                                            const formData = this.form.getValues();
                                            const date = new Date(formData.DueDate)
                                            const time = new Date(formData.TimeDate)
                                            const hours = time.getHours()
                                            const minutes = time.getMinutes()
                                            console.log('hours minutes', hours, minutes)
                                            const newd = date.setHours(hours, minutes)
                                            const newDate = new Date(newd)

                                            const format = webix.Date.dateToStr("%Y-%m-%d %H:%i");
                                            const newFormat = format(newDate)
                                           
                                            const newFormData = {
                                                "Details": formData.Details,
                                                "TypeID": formData.TypeID,
                                                "State": formData.State,
                                                "ContactID": formData.ContactID,
                                                "DueDate": newFormat
                                            }

                                            activities.add(newFormData)
                                            webix.message("New activity is added");
                                        } else if (this.grid_config.type === "edit") {

                                            if (this.form.isDirty()) {
                                                this.form.setDirty();
                                                const formData = this.form.getValues();
                                                console.log('form data', formData)
                                                activities.updateItem(formData.id, formData);
                                                webix.message("Activity is updated.");
                                            } else {
                                                webix.message("Contact hasn't been changed.");
                                            }
                                        }
                                        this.hideWindow();
                                    }


                                }
                            },
                            {}
                        ]
                    },
                ],

                rules: {
                    TypeID: webix.rules.isNotEmpty,
                    ContactID: webix.rules.isNotEmpty,
                    Details: webix.rules.isNotEmpty,
                    // ContactID:webix.rules.isNotEmpty,

                },

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
