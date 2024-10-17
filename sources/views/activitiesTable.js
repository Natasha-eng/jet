import { JetView } from "webix-jet";
import PopupView from "./basePopup.js";

export default class ActivitiesTable extends JetView {
	constructor(app, config) {
		super(app);
		this.table_config = config;
	}

	config() {
		const _ = this.app.getService("locale")._;
		return {
			localId: "tablelayout",
			rows: [
				{
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
									text: _("Deleting cannot be undone. Delete activity?"),
								})
								.then(
									() => {
										this.table_config.collection.remove(id);
										webix.message(_("Activity has been deleted."));
									},
									() => {
										webix.message(_("Canceled"));
									}
								);
							return false;
						}
					}
				}
			]
		}

	}
	init() {
		this.activityTable = this.$$("activities");

		this.on(this.activityTable, "onBeforeFilter", () => {
			const contactID = this.getParam("id", true);

			if (contactID) {

				const detailsFilter = this.activityTable.getFilter("Details")?.value;

				const activityFilter = this.activityTable.getFilter("TypeID")?.value;

				this.activityTable.filter(a => {

					if (contactID == a.ContactID) {
						if (!detailsFilter && !activityFilter) {
							return true;
						}

						if (detailsFilter) {
							return contactID == a.ContactID && a.Details.toLowerCase().indexOf(detailsFilter) !== -1;
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

		const id = this.getParam("id", true);

		!id && this.$$("tablelayout").addView({
			view: "tabbar", localId: "tab-filter", value: 1, options: [
				{ id: 1, value: "common" },
				{ id: 2, value: "completed" },
				{ id: 3, value: "overdue" },
				{ id: 4, value: "today" },
				{ id: 5, value: "tomorrow" },
				{ id: 6, value: "this week" },
				{ id: 7, value: "this month" }
			],
			on: {
				onChange: () => {
					this.activityTable.filterByAll()
				},

			}
		}, 0)

		this.activityTable.registerFilter(
			this.$$("tab-filter"),
			{
				compare: (cellValue, tab_data, obj) => {

					if (tab_data == 2) {
						return obj.State == "Close"
					}

					const today = new Date();

					if (tab_data == 3) {
						const dateMilliseconds = obj.DueDate.valueOf();
						const now = (new Date()).getTime();
						return obj.State == "Open" && dateMilliseconds < now
					}

					const dateWithoutTime = this.toDateWithoutTime(obj.DueDate);

					if (tab_data == 4) {
						const todayWithoutTime = this.toDateWithoutTime(today);
						return dateWithoutTime == todayWithoutTime
					}

					if (tab_data == 5) {
						let tomorrow = new Date();
						tomorrow.setDate(today.getDate() + 1);
						tomorrow = this.toDateWithoutTime(tomorrow)
						return tomorrow == dateWithoutTime
					}

					if (tab_data == 6) {
						const today = new Date();
						const curentWeek = this.getWeek(today);
						const objWeek = this.getWeek(obj.DueDate);
						return curentWeek == objWeek
					}

					if (tab_data == 7) {
						const currentMonth = new Date().getMonth();
						const objMonth = obj.DueDate.getMonth()
						return currentMonth === objMonth
					}

					return obj
				}
			},
			{
				getValue: function (view) {
					return view.getValue();
				},
				setValue: function (view, value) {
					view.setValue(value)
				}
			}
		);


		this.Popup = this.ui(PopupView);
	}

	toDateWithoutTime = (date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)

	getWeek = (date) => {
		let yearStart = +new Date(date.getFullYear(), 0, 1);
		let today = +new Date(date.getFullYear(), date.getMonth(), date.getDate());
		let dayOfyear = ((today - yearStart + 1) / 86400000);
		let week = Math.ceil(dayOfyear / 7)
		return week
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