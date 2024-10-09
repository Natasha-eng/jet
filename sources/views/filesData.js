import { JetView } from "webix-jet";

export default class FilesData extends JetView {
    config() {
        return {
            rows: [
                {
                    view: "datatable",
                    localId: "files-table",
                    height: 500,
                    columns: [
                        {

                            header: "Name",
                            template: "",
                            fillspace: true,
                        },

                        {
                            id: "Date",
                            header: "Change date",
                            format: webix.Date.dateToStr("%Y-%m-%d %H:%i"),
                            fillspace: true,
                            sort: "string"
                        },
                        {

                            header: "Size",
                            template: "",
                            fillspace: true,
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
                    // onClick: {
                    //     removeBtn: (ev, id) => {
                    //         activities.remove(id);
                    //         return false;
                    //     },
                    // }
                },
                {
                    view: "button",
                    value: "Upload file",
                    css: "webix_primary",
                    inputWidth: 200,
                    // click: () => {
                    //     activities.add({});
                    // }
                },
                {}

            ]
        };
    }

}