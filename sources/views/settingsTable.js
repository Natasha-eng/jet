import { JetView } from "webix-jet";

export default class SettingsTable extends JetView {
	constructor(app, config) {
		super(app);
		this.table_config = config;
	}

	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "form",
			rows: [

				{
					view: "datatable",
					localId: "settingsTable",
					columns: this.table_config.columns,
					select: true,
					editable: true,
					scrollX: false,
					css: "webix_shadow_medium",
					onClick: {

						removeBtn: (ev, id) => {
							webix
								.confirm({
									text: _("Deleting cannot be undone. Delete item?"),
								})
								.then(
									() => {
										this.table_config.collection.remove(id);
										webix.message(_("Item has been deleted."));
									},
									() => {
										webix.message(_("Canceled"));
									}
								);
							return false;
						}
					}
				},
				{
					view: "button",
					value: _(`Add ${this.table_config.button_value}`),
					css: "webix_primary",
					inputWidth: 200,
					click: () => {
						this.table_config.collection.add(this.table_config.default);
					}
				},
			]

		};
	}
}