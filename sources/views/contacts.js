import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class ContactsView extends JetView {
	config() {
		return {
			cols: [
				{
					rows: [
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
							value: "Add contact",
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