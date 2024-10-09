import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";
import { statuses } from "../models/statuses";
import UserActivities from "./userActivities";
import { activities } from "../models/activities";

export default class СlientInfo extends JetView {
    config() {
        return webix.promise.all([
            contacts.waitData,
            statuses.waitData,
        ]).then(() => {

            return {
                rows: [
                    {
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
                                                        <span class='webix_icon mdi mdi-cake'></span>
                                                        ${webix.i18n.dateFormatStr(obj.Birthday)}
                                                        </div>

                                                          <div>
                                                        <span class='webix_icon mdi mdi-calendar-check-outline'></span>
                                                        ${webix.i18n.dateFormatStr(obj.StartDate)}
                                                        </div>
        
                                                        <div>
                                                        <span class='webix_icon mdi mdi-map-marker-outline'></span>
                                                        ${obj.Address}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
        
                                            <div class="contact-buttons">
                                                <button class="removeBtn"><span class="webix_icon wxi-trash"></span> Delete</button>
                                                <button class="editBtn"><span class="webix_icon wxi-pencil"></span> Edit</button>
                                            </div>                          
                                        </div>`
                            );
                        },
                        onClick: {
                            editBtn: (ev, id) => {
                               // const contact = this.clientInfo.getValues()
                                this.show(`edit`);
                            },

                            removeBtn: () => {

                                webix
                                    .confirm({
                                        text: "Deleting cannot be undone. Delete contact?",
                                    })
                                    .then(
                                        () => {
                                            const id = this.getParam("id", true)
                                            contacts.remove(id);
                                            const activitiesToRemove = activities.find((activity) => {
                                                return activity.ContactID == id
                                            }).map(item => item.id);

                                            activities.remove(activitiesToRemove)
                                            webix.message("Contact has been deleted.");
                                        },
                                        function () {
                                            webix.message("Canceled");
                                        }
                                    );
                                return false;
                            }
                        }

                    },
                    UserActivities
                ],
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