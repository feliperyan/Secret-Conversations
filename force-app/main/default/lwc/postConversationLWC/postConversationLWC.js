import { LightningElement, api, track } from 'lwc';
import postMessage from '@salesforce/apex/ConversationController.postMessage';

export default class PostConversationLWC extends LightningElement {
    stringValue;
    @api conversation_cat;
    @api recordId;
    @track response;
    @track error;

    handleStringChange(event) {
        this.stringValue = event.target.value;
    }

    handleButtonClick(){
        postMessage({ message: this.stringValue, claimId: this.recordId, category: this.conversation_cat })
            .then(result => {
                this.response = "Message posted";
                console.log(result);
                this.error = undefined;
            })
            .catch(error => {
                this.response = undefined;
                this.error = error;
            });
    }
}