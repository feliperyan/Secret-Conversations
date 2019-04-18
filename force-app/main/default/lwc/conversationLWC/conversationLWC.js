import { LightningElement, api, wire, track } from 'lwc';
import getFeedItemsForClaim from '@salesforce/apex/ConversationController.getFeedItemsForClaim';

export default class ConversationLWC extends LightningElement {
    @api conversation_cat;
    @api recordId;
    @track conversations;
    @track error;

    @wire(getFeedItemsForClaim, { category: "$conversation_cat", claimId: "$recordId" })
    processConversation({error, data}){
        if (data) {
            console.log(data);
            this.conversations = data;
            this.error = undefined;
        } else if (error) {
            console.log(error);
            this.error = error;
            this.conversations = undefined;
        } 
    }
}