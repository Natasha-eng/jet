import { JetView } from "webix-jet";
import FilesData from "./filesData";
import ActivitiesData from "./activitiesData";

export default class UserActivities extends JetView {
	config() {
     
		return {
			rows: [
				{
					cols: [
						{
							view: "tabbar",
							css: "webix_shadow_medium",
							multiview: true,
							value: "activitiesView",
							options: [
								{ value: "Activities", id: "activitiesView" },
								{ value: "Files", id: "filesView" },
							]
						},
					]
				},
				{
					animate: false,
					cells: [
						{ id: "activitiesView", $subview: ActivitiesData },
						{ id: "filesView", $subview: FilesData },
					]
				},
			]
		};
       

	}
}