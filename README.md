# Separate Conversations

## Summary
TL;DR = Have separate threads of conversation on a record so only the right profiles view and respond to relevant messages.

## Description
Using a custom data model, each record of `Claim__c` has 3 records of `Conversation__c`, one for each category of conversation:

- Between employees and customers
- Between employees and partners
- Between partners and customers

We use each of the 3 records to create a separate chatter thread. On the `Claim__c` object we surface the relevant thread using a Lightning Web Component and we set their visibility based on the Profile of the logged in user. Eg: Employee profiles can't see conversations between Customers and Partners, as the example below.

![Salesforce screenshot](/demo.gif "Animated Gif")
