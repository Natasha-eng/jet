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
		this._ = this.app.getService("locale")._;

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
							return a.Details.toLowerCase().includes(detailsFilter) && a.TypeID == activityFilter
						}

						if (detailsFilter) {
							return a.Details.toLowerCase().includes(detailsFilter) && contactID == a.ContactID;
						}

						if (activityFilter) {
							return a.TypeID == activityFilter && contactID == a.ContactID;
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
				{ id: 1, value: this._("common") },
				{ id: 2, value: this._("completed") },
				{ id: 3, value: this._("overdue") },
				{ id: 4, value: this._("today") },
				{ id: 5, value: this._("tomorrow") },
				{ id: 6, value: this._("this week") },
				{ id: 7, value: this._("this month") }
			],
			on: {
				onChange: () => {
					this.activityTable.filterByAll()
				},

			}
		}, 0)

		!id && this.activityTable.registerFilter(
			this.$$("tab-filter"),
			{
				compare: (cellValue, tab_data, obj) => {
					if (Number(tab_data) === 2) {
						return obj.State === "Close"
					}

					const today = new Date();

					if (Number(tab_data) === 3) {
						const dateMilliseconds = obj.DueDate.valueOf();
						const now = (new Date()).getTime();
						return obj.State === "Open" && dateMilliseconds < now
					}

					const dateWithoutTime = this.toDateWithoutTime(obj.DueDate);

					if (Number(tab_data) === 4) {
						const todayWithoutTime = this.toDateWithoutTime(today);
						return dateWithoutTime == todayWithoutTime
					}

					if (Number(tab_data) === 5) {
						let tomorrow = new Date();
						tomorrow.setDate(today.getDate() + 1);
						tomorrow = this.toDateWithoutTime(tomorrow);
						return tomorrow === dateWithoutTime
					}

					if (Number(tab_data) === 6) {
						const today = new Date();
						const curentWeek = this.getWeek(today);
						const objWeek = this.getWeek(obj.DueDate);
						return curentWeek === objWeek
					}

					if (Number(tab_data) === 7) {
						const currentMonth = new Date().getMonth();
						const objMonth = obj.DueDate.getMonth();
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
					view.setValue(value);
				}
			}
		);


		this.Popup = this.ui(PopupView);
	}

	toDateWithoutTime = (date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

	getWeek = (date) => {
		let yearStart = +new Date(date.getFullYear(), 0, 1);
		let today = +new Date(date.getFullYear(), date.getMonth(), date.getDate());
		let dayOfyear = ((today - yearStart + 1) / 86400000);
		let week = Math.ceil(dayOfyear / 7);
		return week;
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