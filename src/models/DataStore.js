
import { observable, computed, action } from "mobx"; 

export default class DataStore {
    constructor(rootStore){
        this.root = rootStore;
    
    }

    @observable members = [];
    
    @observable uploadingText = '';

    updateMembers (db){
        const newMembers = JSON.parse(this.uploadingText);
        const batch = db.batch();

        newMembers.forEach(mem => {
            db.collection('members').doc(`${mem.name}`).set({
                name: mem.name,
                class: mem.class,
                ep: mem.ep,
                gp: mem.gp,
                pr: mem.pr
            }).then(function() {
                console.log("Document successfully written!");
            });
        })
    }
 
}