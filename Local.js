

function clearLocalStorage(){
	localStorage.clear();
	potentialwid = 0;
}
function getFromLocalStorage(key){
	return JSON.parse(localStorage.getItem(key));
}
function addToLocalStorage(key, value){
	localStorage.setItem(key, JSON.stringify(value));
}
function removeFromLocalStorage(key){
	localStorage.removeItem(key);
}
function resetMasterKey(){
	widMasterKey = "widmaster_";
}

// Testing: To get output to the screen and console, set to 'True'
potentialwid = 0;

//Starting of getFromMongo function
// As of now, the code simply calls local storage, not mongo
function getFromMongo(inputWidgetObject) {
	printToDiv('-----Function getFromMongo() Object to get : ', inputWidgetObject );
	var output={};

	//if(isParameterLower(inputWidgetObject, "wid")){
		if(inputWidgetObject["wid"]){
			var widKey=inputWidgetObject["wid"].toLowerCase();
			printToDiv('-----Function getFromMongo() widkey ', widKey ); 
			printToDiv('-----Function getFromMongo() widMasterKey', widMasterKey );  
			//LocalStorage: Get Wid
			output=getFromLocalStorage(widMasterKey + widKey);
			if (output==null) {output="";}
			// convert metadata.method to metadata for internal 'dot' reasons
			var item="";	
			for (item in output) {
			//if ((output[item].length!==0) && (item=="metadata.method")) {
			//	printToDiv('-----Function getFromMongo() outputitem', output[item] );  
			//	output["metadatamethod"]=output[item];
			//	delete output["metadata.method"];
			//	}
			}	
		}
	//}
	printToDiv('-----Function getFromMongo() object retreived ', output );	
	return output;
}//End of getFromMongo function	

	
// Starting of securityCheck function
// LM: I think this section is turned off and not used since it was breaking the code, but it 
// should be saved and implemented later
function securityCheck(widParameter, accessToken){ // accountwid and transactionType for future use
	printToDiv('Function securityCheck() in : ', 'before' );
	return true;
	var widInput= { wid:widParameter, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
	var accessTokenInput= { wid:accessToken, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
	var widOutput=queryWid(widInput);
	printToDiv('Function queryWid() out with  output : ', widOutput );	
	var accessTokenOutput=queryWid(accessTokenInput);
	printToDiv('Function queryWid() out with  output : ', accessTokenOutput );	
	var securityCheckOutput = widOutput['security']>accessTokenOutput['security'];
	printToDiv('Function securityCheck() out with  output : ', securityCheckOutput );
	return securityCheckOutput;
}// End of queryWid function



// Cycles through local storage looking for a match to the query
function simpleQuery(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, dtotype){

	var returnfromSimpleQuery=[];
	var enhancedreturn=[];

				printToDiv('Function simpleQuery in : mongowidmethod',  mongowidmethod);

	if(mongorelationshipdirection == "forward") {
		// step through local storage looking for
	   for (var key in localStorage){
			var myvalue = JSON.parse(localStorage.getItem(key));

						printToDiv('Function simpleQuery in : myvalue*****************************',  myvalue);

			if ((key.indexOf(widMasterKey) == 0) && (myvalue["primarywid"] == widInput) && (myvalue["LOG"] === undefined)) {
               var widName = myvalue["primarywid"];

			   var key = myvalue["secondarywid"];
			   var value = getFromMongo({wid:key, dtotype:mongowidmethod});
               delete value.wid;
               var resultObj = {};
			   resultObj[key]= value;

			   			printToDiv('Function simpleQuery in : resultObj I',  resultObj);

			  
				if ((value["metadata.method"] === undefined) || (value["metadata.method"] == "")) {	
					widdto = "";
				}else {
					widdto = value["metadata.method"]
				}

				// changed 10/30 if ((mongowidmethod !== undefined) && (mongowidmethod == widdto)) {
				if (((mongowidmethod !== undefined) && (mongowidmethod == widdto)) || (mongowidmethod=="")) {
								printToDiv('Function simpleQuery in : resultObj',  resultObj);

					returnfromSimpleQuery.push(resultObj);
				}
			 }
		}
	}
	printToDiv('Function simpleQuery in : returnfromSimpleQuery',  returnfromSimpleQuery);
    returnfromSimpleQuery=returnfromSimpleQuery.sort(function(aObj, bObj) {
   		var a = getAttributeByIndex(aObj, 0);
   		var b = getAttributeByIndex(bObj, 0);     
   		if (a < b) return -1;
   		if (a > b) return 1;
    	return 0;
 		});
    if (returnfromSimpleQuery.length>0) {
    	if (mongorelationshipmethod='first') {enhancedreturn=returnfromSimpleQuery[0]};
   	 	if (mongorelationshipmethod='last') {enhancedreturn=returnfromSimpleQuery[returnfromSimpleQuery.length]};
		if (mongorelationshipmethod='all') {enhancedreturn=returnfromSimpleQuery};
		}
	printToDiv('Function simpleQuery in : returnfromSimpleQuery',  returnfromSimpleQuery);
	return enhancedreturn;
}


// Prepares an object to be recorded in local storage and puts it there
function MongoAddEditPrepare(Indto, InList, widid, widdto) {
	/* 	Indto = [{"key":"e","value":"onetomany"}];

					InList = [{"key":"e","value":"f"}]; */
			printToDiv('Function MongoAddEditPrepare, Indto : ', Indto);
			printToDiv('Function MongoAddEditPrepare, InList : ', InList);
			printToDiv('Function MongoAddEditPrepare, widid : ', widid);
			printToDiv('Function MongoAddEditPrepare, widdto : ', widdto);

    var InListObj = {};
    InListObj = listToObject(InList);

    if ((InListObj["metadata.method"]===undefined) || (InListObj["metadata.method"] == "")) {
	    if ((widdto!==undefined) || (widdto!="")) {InListObj["metadata.method"] = widdto};
		}
 	if ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == "")) {
     	InListObj["metadata.method"] = 'defaultdto';
    	} 

    if ((InListObj["wid"]===undefined) || (InListObj["wid"] == "")){
	    if ((widid!==undefined) || (widid!="")) {InListObj["wid"] = widid};
		}
 	if ((InListObj["wid"] === undefined) || (InListObj["wid"] == "")) {
    	potentialwid=potentialwid+1;
     	InListObj["wid"] = potentialwid.toString();
    	} 
    	else 
    	{
    	//Debug='true';
		rawobject = getFromMongo({"wid":InListObj["wid"]});

				printToDiv('Function MongoAddEditPrepare InListObj before : ', InListObj);
				printToDiv('Function MongoAddEditPrepare rawobject from get : ', rawobject);

		InListObj =  jsonConcat(InListObj,rawobject);

				printToDiv('Function MongoAddEditPrepare InListObj after : ', InListObj);

		//Debug='false';
		}

	InListObj["wid"]=InListObj["wid"].toLowerCase();
	addToLocalStorage(widMasterKey + InListObj["wid"], InListObj);
	//olddebug=Debug;
	//Debug='true';

			printToDiv('Function MongoAddEditPrepare, ******************* Mongo record added : ', InListObj);

	//Debug=olddebug;				
	InListObj["LOG"]="LOG";
	addToLocalStorage(widMasterKey + "add_"+InListObj["wid"], InListObj);
	return InListObj;
}


function AddMongoRelationship(ParentWid,ChildWid,attr){
	relationshipdto={'primarywid':'string','secondarywid':'string', 'relationshiptype':'string','metaddata.method':'string'};
	// note above should be list but does not matter
	InList = [];
	InList.push({"key":"primarywid","value":ParentWid});
	InList.push({"key":"secondarywid","value":ChildWid});
	InList.push({"key":"relationshiptype","value":attr});
	InList.push({"key":"metadata.method","value":"relationshipdto"});

	for (var key in localStorage){				// search for duplicate
		var myvalue = JSON.parse(localStorage.getItem(key));
		if ((myvalue['primarywid']==ParentWid) && (myvalue['secondarywid']==ChildWid) && (myvalue['LOG']!='LOG')) {
			InList.push({"key":"wid","value":myvalue['wid']});
			}
		}

	AddedObject = MongoAddEditPrepare([], InList, "", attr );
}


