import { JetView } from "webix-jet";
import { files } from "../models/files";

export default class FilesData extends JetView {
	config() {
		return {
			rows: [
				{
					view: "datatable",
					localId: "files-table",
					id: "files",
					height: 500,
					columns: [
						{
							id: "name",
							header: "Name",
							fillspace: true,
						},

						{
							id: "date",
							header: "Change date",
							fillspace: true,
							sort: "string"
						},
						{
							id: "sizetext",
							header: "Size",
						},
						{
							id: "delete",
							header: "",
							template: "<span class='removeBtn webix_icon wxi-trash'></span>",
						},
					],
					select: true,
					editable: true,
					scrollX: false,
					onClick: {
						removeBtn: (ev, id) => {
							files.remove(id);
							return false;
						},
					}
				},
				{
					view: "uploader",
					value: "Upload file",
					css: "webix_primary",
					inputWidth: 200,
					autosend: false,
					upload: "",
					on: {
						onAfterFileAdd: (file) => {
							const date = new Date().toDateString();
							const ContactID = this.getParam("id", true);
							files.add({ name: file.name, sizetext: file.sizetext, ContactID, date });
						}
					}
				},
				{}

			]
		};
	}

	init() {
		this.files = this.$$("files-table");
		this.files.parse(files);
	}

}