import { JetView } from "webix-jet";
import { files } from "../models/files";
import FilesTable from "./filesTable";

export default class FilesData extends JetView {

	config() {
		return {
			rows: [
				FilesTable,
				{
					view: "uploader",
					value: "Upload file",
					css: "webix_primary",
					inputWidth: 200,
					autosend: false,
					on: {
						onAfterFileAdd: (file) => {
							const date = new Date().toDateString();
							const ContactID = this.getParam("id", true);
							files.add({ name: file.name, sizetext: file.sizetext, ContactID, date });
						}
					}
				},
			]
		};
	}

	init() {
		this.files = this.$$("files-table");
	}
}