const dateToStr = webix.Date.dateToStr("%Y-%m-%d %H:%i");
const strToDate = webix.Date.strToDate("%Y-%m-%d %H:%i");

export const contacts = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/",
	scheme: {
		$change: function (obj) {
			if (obj.StartDate) {
				if (typeof obj.StartDate == "string") {
					obj.StartDate = strToDate(obj.StartDate);
				} 
			}

			if (obj.Birthday) {
				if (typeof obj.Birthday == "string") {
					obj.Birthday = strToDate(obj.Birthday);
				} 
			}

			obj.value = `${obj.FirstName} ${obj.LastName}`;
		},
		$save: function (obj) {
			if (obj.StartDate) {
				obj.StartDate = dateToStr(obj.StartDate);
			}

			if (obj.Birthday) {
				obj.Birthday = dateToStr(obj.Birthday);
			}
		},
	},
});