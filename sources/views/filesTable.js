import { files } from "../models/files";
import ActivitiesTable from "./activitiesTable";

export default class FilesTable extends ActivitiesTable {
	constructor(app) {
		super(app, {
			collection: files,
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
			]
		});
	}
}