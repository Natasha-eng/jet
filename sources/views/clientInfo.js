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
                                                <img src=${obj.Photo || "../../assets/no-avatar.jpg"} alt="avatar" width="200" height="200">
                                                <div>${obj.status}</div> 
                                            </div>
                                    
                                            <div class="infoItem">

                                                <div>
                                                ${obj.Email}
                                                </div>

                                                <div>
                                                ${obj.Skype}
                                                </div>

                                                <div>
                                                ${obj.Job}
                                                </div>
                                                
                                                <div>
                                                ${obj.Company}
                                                </div>
                                        
                                            </div>
                                        
                                            <div class="infoItem">
                                            
                                                <div>
                                                ${obj.Birthday}
                                                </div>

                                                <div>
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
            }
        })





    }

    init() {
        this.$$("clientInfo").parse(statuses)
    }

    urlChange(view, url) {
        this.clientInfo = this.$$("clientInfo");

        const id = url[0].params.id;

        this.clientInfo.parse(statuses).then(() => {
            if (id) {
                const contact = contacts.getItem(id);
                const status = statuses.find((s) => s.id == contact.StatusID)
                const contactWithStatus = { ...contact, status: status[0].Value }

                this.clientInfo.setValues(contactWithStatus);
            }
        });


    }
}