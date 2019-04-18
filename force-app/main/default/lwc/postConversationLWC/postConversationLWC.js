import { LightningElement, api } from 'lwc';

export default class PostConversationLWC extends LightningElement {
    stringValue;
    @api conversation_cat;
}