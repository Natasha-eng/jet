import { JetView } from "webix-jet";
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

				removeBtn: (ev, id) => {
					webix
						.confirm({
							text: "Deleting cannot be undone. Delete activity?",
						})
						.then(
							() => {
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

		this.on(this.activityTable, "onAfterFilter", () => {
			const contactID = this.getParam("id", true);

			if (contactID) {

				const detailsFilter = this.activityTable.getFilter("Details")?.value;

				const activityFilter = this.activityTable.getFilter("TypeID")?.value;

				this.activityTable.filter(a => {

					if (contactID == a.ContactID) {
						if (!detailsFilter && !activityFilter) {
							return true;
						}

						if (detailsFilter && activityFilter) {
							return a.Details.toLowerCase().includes(detailsFilter) && a.TypeID == activityFilter;
						}

						if (detailsFilter) {
							return a.Details.toLowerCase().includes(detailsFilter);
						}

						if (activityFilter) {
							return a.TypeID == activityFilter;
						}

						return false

					} else {
						return false;
					}
				});
			}

		});

		this.Popup = this.ui(PopupView);
	}

	urlChange() {
		this.activityTable.sync(this.table_config.collection, () => {
			const contactID = this.getParam("id", true);
			if (contactID) {
				this.activityTable.filter(a => contactID == a.ContactID);
			} else {
				this.activityTable.waitData.then(() => {
					const firstId = this.activityTable.getFirstId();
					if (firstId) {
						this.activityTable.select(firstId);
					}
				});
			}
		});
	}
}