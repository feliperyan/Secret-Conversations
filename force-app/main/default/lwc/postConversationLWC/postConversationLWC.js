import { LightningElement, api, track, wire } from 'lwc';
import postMessage from '@salesforce/apex/ConversationController.postMessage';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class PostConversationLWC extends LightningElement {
    stringValue;
    @api conversation_cat;
    @api recordId;
    @track response;
    @track error;
    @wire(CurrentPageReference) pageRef;

    handleStringChange(event) {
        this.stringValue = event.target.value;
    }

    handleButtonClick(){
        postMessage({ message: this.stringValue, claimId: this.recordId, category: this.conversation_cat })
            .then(result => {
                this.response = "Message posted";
                //console.log(result);
                //console.log("message posted")
                this.error = undefined;
                fireEvent(this.pageRef, 'messagePosted');
            })
            .catch(error => {
                //console.log("error");
                this.response = undefined;
                this.error = error;
            });
    }
}