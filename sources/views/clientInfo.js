import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import { statuses } from "../models/statuses";

export default class СlientInfo extends JetView {
    config() {
        return webix.promise.all([
            contacts.waitData,
            statuses.waitData,
        ]).then(() => {

            return {
                localId: "clientInfo",
                template: function (obj) {
                    return (
                        `<div class='contact'>
                                    <div class="infoWrapper">
                                        ${obj.FirstName} ${obj.LastName || ""}
                                        <div class="contactContainer">
                                            <div> 
                                                <img src=${obj.Photo || "../../assets/no-avatar.jpg"} alt="avatar" width="100" height="100">
                                                <div class="status">${obj.status} <span class="webix_icon wxi-${obj.icon}"></span></div> 
                                            </div>
                                    
                                            <div class="infoItem">

                                                <div>
                                                <span class='webix_icon mdi mdi-email'></span>
                                                ${obj.Email}
                                                </div>

                                                <div>
                                                <span class='webix_icon mdi mdi-skype-business'></span>
                                                ${obj.Skype}
                                                </div>

                                                <div>
                                                <span class='webix_icon mdi mdi-label-variant'></span>
                                                ${obj.Job}
                                                </div>
                                                
                                                <div>
                                                <span class='webix_icon mdi mdi-briefcase-variant-outline'></span>
                                                ${obj.Company}
                                                </div>
                                        
                                            </div>
                                        
                                            <div class="infoItem">
                                            
                                                <div>
                                                <span class='webix_icon mdi mdi-calendar-check-outline'></span>
                                                ${obj.Birthday}
                                                </div>

                                                <div>
                                                <span class='webix_icon mdi mdi-map-marker-outline'></span>
                                                ${obj.Address}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="contact-buttons">
                                        <button><span class="webix_icon wxi-trash"></span> Delete</button>
                                        <button><span class="webix_icon wxi-pencil"></span> Edit</button>
                                    </div>                          
                                </div>`
                    );
                },
            };
        });
    }

    init() {
        this.clientInfo = this.$$("clientInfo");
    }

    urlChange() {
        let id = this.getParam("id", true);

        if (id) {
            const contact = contacts.getItem(id);
            const status = statuses.find((s) => s.id == contact.StatusID);
            const contactWithStatus = { ...contact, status: status[0].Value, icon: status[0].Icon };

            this.clientInfo.setValues(contactWithStatus);
        }

    }
}