import { JetView } from "webix-jet";
import { activities } from "../models/activities.js";
import PopupView from "./basePopup.js";


export default class ActivitiesTable extends JetView {
    constructor(app, config) {
		super(app);
		this.table_config = config;
	}

    config() {
        return {
            view: "datatable",
            localId: "activities",
            columns: this.table_config.columns,
            select: true,
            editable: true,
            scrollX: false,
            css: "webix_shadow_medium",
            onClick: {
                editBtn: (ev, id) => {
                    const activity = this.table_config.collection.getItem(id);
                    this.Popup.showWindow(activity);
                },

                removeBtn:  (ev, id) => {
                    webix
                        .confirm({
                            text: "Deleting cannot be undone. Delete activity?",
                        })
                        .then(
                             ()=>  {
                                this.table_config.collection.remove(id);
                                webix.message("Activity has been deleted.");
                            },
                             () => {
                                webix.message("Canceled");
                            }
                        );
                    return false;
                }
            }


        };
    }
    init() {
        this.activityTable = this.$$("activities");

        this.activityTable.sync(this.table_config.collection, () => {
            const contactID = this.getParam("id", true);
            if (contactID) {
                this.activityTable.filter(a => contactID == a.ContactID);
            }
        });

        this.Popup = this.ui(PopupView);
    }
}