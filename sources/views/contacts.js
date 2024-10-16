import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			cols: [
				{
					rows: [
						{
							view: "text",
							localId: "contacts-filter",
							on: {
								onTimedKeyPress: () => {
									const value = this.$$("contacts-filter").getValue();


									if (!value) {
										return this.contacts.filter();
									}
									const inputArr = value.split(" ");

									this.contacts.filter((obj) => {
										return inputArr.every(val => {
											return obj.FirstName.toLowerCase().indexOf(val) > -1 ||
												obj.LastName.toLowerCase().indexOf(val) > -1 ||
												obj.Job.toLowerCase().indexOf(val) > -1 ||
												obj.Skype.toLowerCase().indexOf(val) > -1 ||
												obj.Company.toLowerCase().indexOf(val) > -1 ||
												obj.Website.toLowerCase().indexOf(val) > -1 ||
												obj.Email.toLowerCase().indexOf(val) > -1;
										});
									});

								}
							}
						},
						{
							view: "list",
							id: "contactsView",
							localId: "contacts",
							width: 300,
							scrollX: false,
							select: true,
							css: "webix_shadow_medium",
							type: {
								height: 62
							},
							template: function (obj) {

								return (
									`<div class='contacts'><img src=${obj.Photo || "../../assets/no-avatar.jpg"} alt="avatar" width="40" height="40"> 
								<div class='contactsInfo'><div>${obj.FirstName || ""}  ${obj.LastName || ""}</div><div class='contactCompany'>${obj.Company || ""}</div></div> 
								</div>`
								);
							},

							data: contacts
						},
						{
							view: "button",
							value: _("Add contact"),
							css: "webix_primary",
							click: () => {
								this.show("editor?mode=add");
							}

						},

					]

				},
				{ $subview: true },
			]
		};
	}
	init() {
		this.contacts = this.$$("contacts");
		this.contacts.parse(contacts);

		this.on(this.contacts, "onAfterSelect", (id) => {
			if (!id) {
				this.setParam("id", null, true);
			} else {
				this.setParam("id", id, true);
			}
		});

		this.on(contacts.data, "onStoreUpdated", (id, obj, mode) => {

			if (mode === "add") {

				this.contacts.select(id);
			} else if (mode === "delete") {

				const firstId = contacts.getFirstId();
				this.contacts.select(firstId);
			}
		});

		//select first id on page loading
		contacts.waitData.then(() => {
			const firstId = contacts.getFirstId();
			if (firstId)
				this.contacts.select(firstId);

		});

		this.show("clientInfo");
	}
}