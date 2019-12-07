
import { observable, computed, action } from "mobx"; 
import moment from "moment";

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
            if (mem.pr === 0) return;
            db.collection('members').doc(`${mem.name}`).set({
                name: mem.name,
                class: mem.class,
                ep: mem.ep,
                gp: mem.gp,
                pr: mem.pr,
                date: moment(Date.now()).format('YYYY-MM-DD')
            }).then(function() {
                console.log("Document successfully written!");
            });
        })
    }

    @action
    getDate(db){
        db.collection('members').limit(1).get().then(member=>{
            if(!member.empty){
                const mem = member.docs[0];
                this.root.ui.reportDate = mem.data().date;
            }
        });
    }
 
}