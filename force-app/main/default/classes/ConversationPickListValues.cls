global class ConversationPickListValues extends VisualEditor.DynamicPickList {
	
    global override VisualEditor.DataRow getDefaultValue(){
        String first = getPickListValuesIntoList()[0];
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow(first, first);
        return defaultValue;
    }
    
    global override VisualEditor.DynamicPickListRows getValues() {
        List<VisualEditor.DataRow> values = new List<VisualEditor.DataRow>();
        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
        
        for (String s : getPickListValuesIntoList()){
			myValues.addRow(new VisualEditor.DataRow(s, s));
        }
        
        return myValues;
    }
    
    public static List<String> getPickListValuesIntoList(){
       List<String> pickListValuesList= new List<String>();
		Schema.DescribeFieldResult fieldResult = Conversation__c.Conversation_Category__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList;
    }
    
}