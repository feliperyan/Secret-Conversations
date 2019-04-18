public with sharing class ConversationController {
    public ConversationController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<String> getConversationRecordsForClaim(String category, String claimId){
        Conversation__c convo = [Select Id, Conversation_Category__c 
            From Conversation__c 
            Where Claim__c =: claimId and Conversation_Category__c =: category Limit 1];
        
        List<String> messages = getComments(convo.Id);

        return messages;
    }

    public static List<String> getComments(String recordID){
        List<String> messages = new List<String>();

        ConnectApi.FeedElementPage fep = ConnectApi.ChatterFeeds.getFeedElementsFromFeed(Network.getNetworkId(), ConnectApi.FeedType.Record , recordID);
        for (ConnectApi.FeedElement f : fep.elements){
            messages.add(f.body.text);
            System.debug(f.body.text + ' ' + f.createdDate + ' ' + f.id);
			System.debug(f.toString());            
        }
        return messages;
    }

    @AuraEnabled(cacheable=true)
    public static List<ConnectApi.FeedElement> getFeedItemsForClaim(String category, String claimId){
        Conversation__c convo = [Select Id, Conversation_Category__c 
            From Conversation__c 
            Where Claim__c =: claimId and Conversation_Category__c =: category Limit 1];
        
        return getFeedItems(convo.Id);        
    }

    public static List<ConnectApi.FeedElement> getFeedItems(String recordID){
        ConnectApi.FeedElementPage fep = ConnectApi.ChatterFeeds.getFeedElementsFromFeed(Network.getNetworkId(), ConnectApi.FeedType.Record , recordID);
        return fep.elements;        
    }

    @AuraEnabled
    public static ConnectApi.FeedElement postMessage(String message, String claimId, String category){
        Conversation__c convo = [Select Id, Conversation_Category__c 
            From Conversation__c 
            Where Claim__c =: claimId and Conversation_Category__c =: category Limit 1];

        ConnectApi.FeedElement feedElement = ConnectApi.ChatterFeeds.postFeedElement(Network.getNetworkId(), convo.id, ConnectApi.FeedElementType.FeedItem, message);
        
        return feedElement;
    }

}
