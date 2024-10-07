const dateToStr = webix.Date.dateToStr("%Y-%m-%d %H:%i");
const strToDate = webix.Date.strToDate("%Y-%m-%d %H:%i");

export const activities = new webix.DataCollection({
    url: "http://localhost:8096/api/v1/activities/",
    save: "rest->http://localhost:8096/api/v1/activities/",

    scheme: {
        $change: function (obj) {
            if (obj.DueDate) {
                if (obj.TimeDate) {
                    obj.DueDate.setHours(
                        obj.TimeDate.getHours(),
                        obj.TimeDate.getMinutes()
                    );
                } else if (typeof obj.DueDate === "string") {
                    obj.DueDate = strToDate(obj.DueDate);
                }
                // sync custom field with DueDate
                obj.TimeDate = new Date(obj.DueDate);
            }
        },
        $save: function (obj) {
            if (obj.DueDate) {
                obj.DueDate = dateToStr(obj.DueDate);
            }
            // do not send custom fields to the server
            delete obj.TimeDate;
        },
    },
})