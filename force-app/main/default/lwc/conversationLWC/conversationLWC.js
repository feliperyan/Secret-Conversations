import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { LightningElement, api, wire, track } from 'lwc';
import getFeedItemsForClaim from '@salesforce/apex/ConversationController.getFeedItemsForClaim';
import { refreshApex } from '@salesforce/apex';


export default class ConversationLWC extends LightningElement {
    @api conversation_cat;
    @api recordId;    
    @track error;
    @wire(CurrentPageReference) pageRef;
    @track conversations;

    wiredConversationsResult;

    @wire(getFeedItemsForClaim, { category: "$conversation_cat", claimId: "$recordId" })
    processConversation(result){
        this.wiredConversationsResult = result;
        if (result.data) {
            //console.log(data);
            this.conversations = result.data;
            this.error = undefined;
        } else if (result.error) {
            //console.log(error);
            this.error = result.error;
            this.conversations = undefined;
        } 
    }

    handleEvent(){
        console.log('message received.');
        return refreshApex(this.wiredConversationsResult);        
    }

    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('messagePosted', this.handleEvent, this);
    }    
    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }
}