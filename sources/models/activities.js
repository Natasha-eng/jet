export const activities = new webix.DataCollection({
    url: "http://localhost:8096/api/v1/activities/",
    save: "rest->http://localhost:8096/api/v1/activities/",

    scheme: {
        $init: function (obj) {

            if (obj.DueDate) {
                const date = new Date(obj.DueDate);
                const time = new Date(obj.TimeDate);

                const hours = obj.TimeDate ? time.getHours() : date.getHours();
                const minutes = obj.TimeDate ? time.getMinutes() : date.getMinutes();

                const newd = date.setHours(hours, minutes);
                const newDate = new Date(newd);

                const format = webix.Date.dateToStr("%H:%i");
                const formattedTime = format(newDate);

                obj.DueDate = newDate;
                obj.TimeDate = formattedTime;
            }

        },

        $save: function (obj) {
            if (obj.DueDate) {
                const format = webix.Date.dateToStr("%Y-%m-%d %H:%i");
                const newFormat = format(obj.DueDate);
                obj.DueDate = newFormat
            }
        },

        $update: function (obj) {
            const hours = obj.TimeDate.getHours();
            const minutes = obj.TimeDate.getMinutes();

            const newd = obj.DueDate.setHours(hours, minutes);
            const newDate = new Date(newd);

            const format = webix.Date.dateToStr("%H:%i");
            const formattedTime = format(obj.TimeDate);

            obj.TimeDate = formattedTime
            obj.DueDate = newDate
        },
    },
})