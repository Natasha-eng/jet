import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import ClientInfo from "./clientInfo.js";

export default class ContactsView extends JetView {
	config() {
		return {
			cols: [
				{
					view: "list",
					localId: "contacts",
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
				{ $subview: true }
			]
		};
	}
	init() {
		this.contacts = this.$$("contacts");
		this.contacts.parse(contacts);

		this.on(this.contacts, "onSelectChange", (id) => {
			if (!id[0]) {
				this.setParam("id", null, true);
			} else {
				this.setParam("id", id[0], true);
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