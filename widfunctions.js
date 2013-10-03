

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

// Outputs data to screen and console
function printToDiv(text, obj, debugone){
	if(Debug == 'true') {

	//if((debugone !== undefined) || (Debug=='true')) {
		printText	= '<pre>'+ text+'<br/>' + JSON.stringify(obj) + '</pre>';
		console.log(text);
		console.log(obj);
		document.getElementById('divprint').innerHTML = document.getElementById('divprint').innerHTML + printText; //append(printText);
	}
}
//end of testing
	



	

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



     // if ((dto === undefined) || (dto == "")) {
    //     dto = 'defaultdto';
    // }
    // printToDiv('Function MongoAddEditPrepare, dto : ', dto);
    // // ** makes no sense to send in attr
    // if (dtoExists !== 0) {
    // 	InListObj = listToObject(Indto);
    // 	firstrecord = InListObj[0];
    // 	for (key in firstrecord) {
    		
    // 		var attribute=firstrecord[key];
    //   		if ((attribute =='onetomany') || (attribute =='onetoone')) {
    //   			dto=key;
    //         	InList = DeletePrefix(InList, dto);
    //         }
    //     }
    // }
	  	// convert from internal metadatametjod to external metadata.method
		// if ((InListObj['metadata.method'] === undefined) || (InListObj['metadata.method'] =="")) {
		// 	InListObj["metadata.method"]=InListObj["metadatamethod"];
		// 	delete InListObj["metadatamethod"];
		// }
		// if ((InListObj['metadata.method'] === undefined) || (InListObj['metadata.method'] =="")) {
		// 	InListObj["metadata.method"] = dto;
		// }
	//InListObj["metadata.method"] = dto;
		// ** send in inherit to only save what changed
    // if wid is undefined them make up a random guid as wid
    // other wise try to read that wid
    // if that wid exists then we want to try to update only values that have changed
    // iterate through each pair, if equal then delete from inlist and Indto
        //currentwidobj = getWidMasterLevel({
        //    "wid": InListObj["wid"],
        //    "command.dtotype": dto,
            //" "
        //    "command.inherit": "",
        //    "command.convertmethod": "",
        //    "command.accesstoken": ""
		//});
		//extraparametes = read curren raw wid
		//filtered extra parameters = remove from extra parameters covered by dtodef
		//parameters to be added = incoming parameters + filtered extra parameters

		// we want to make sure we only save changes
		// read existing wid data
		// merge it in

		// rawlist = objectToList(rawobject);			// this is the actual data store right now

		// // get existing wid filterd through dto 
		// currentwidobj=getWidMongo(currentwid, "", dto, "", "",Indto, "");
		// currentwidlist = objectToList(currentwidobj);

		// // make list of old parameters that are not in dto...make sure they survive
		// oldwidlist = SplitObjectList(rawlist, currentwidlist);
		// oldwidlist = oldwidlist.nomatch;

		// // combine old parameters and new parameters
		// oldwidobject = listToObject(oldwidlist);



		
		// if (currentwidobj.length) {
		// 	potentialwid = currentwidobj["wid"];
		// 	for (item in currentwidobj) {
		// 		if (currentwidobj[item] == InListObj[item]) {
		// 			delete InListObj[item];
		// 			if (dtoExists!==0) {
		// 				delete InListdto[item];
		// 			}
		// 		}
		// 	}
		// 	InListObj["wid"] = potentialwid;
		// 	}
	
	//LocalStorage: Add Wid
	//var storageKey = widMasterKey + InListObj["wid"];
	//var finalObject = extend(InListObj, getFromLocalStorage(storageKey));
	//addToLocalStorage(storageKey, finalObject);





/* End of lib.js functions */


// function ProcessBrackets(parameterobject, dtoobject, parentwid, dtotypeindex) {
// 	// look for parameters that start with dtotypeindex in dtoobject
// 	// trying to convert brakets to wid
// 				printToDiv('Function ProcessBrackets() input dtoobject: ',  dtoobject);
// 	var dtoList=objectToList(dtoobject);
// 				printToDiv('Function ProcessBrackets() input parameterobject: ',  parameterobject);
// 				printToDiv('Function ProcessBrackets() input dtoList: ',  dtoList);
// 				printToDiv('Function ProcessBrackets() input parentwid: ',  parentwid);
// 				printToDiv('Function ProcessBrackets() input dtotypeindex: ',  dtotypeindex);
// 	if(parentwid === undefined) {
// 		return;
// 	}
// 	var index;
// 	var object = dtotypeindex.split("<");
// 	if(!object || !object[1]) {
// 		index=0;
// 	} else {
// 		index = object[1].split(">")[0];
// 	}
// 	var result = [];		
// 	var dtotype = object[0];

// 				printToDiv('Function ProcessBrackets() dtotype: ',  dtotype);
// 				printToDiv('Function ProcessBrackets() index: ',  index);
				
// 	if(index != 0) {
// 		var existingwidsobject = {};
// 		existingwidsobject = simpleQuery(parentwid, 'attribute', 'all', 'forward', dtotype, "", "");
// 		printToDiv('Function ProcessBrackets() existingwidsobject: ',  existingwidsobject);
// 		parameterobject["wid"] = existingwidsobject[index];
// 	} else {
// 		parameterlist=objectToList(parameterobject)
// 		result.push(parameterlist);
// 		result.push(dtoList);
// 	}

// 				printToDiv('Function ProcessBrackets() result : ',  result);

// 	return result;
// }




// This is for the funcitonality of the testing screen itself
$('#mybutton').click(function() {
  if ($('#divwidsdisplay').css('display') == 'block'){
    $('#divwidsdisplay').hide('slow');
  }
  else{
  	displayAllWids();
    $('#divwidsdisplay').show('slow');
  }
});

// This is for the funcitonality of the testing screen itself
$('.test_example').click(function() {
  var test = $(this).next('span');
  if ($(test).css('display') != 'none'){
    $(test).hide('slow');
  }
  else{
    $(test).show('slow');
  }
});

// function loadLocalData(data) {
// 	// alert("it changed to: " + data);
// 	clearLocalStorage();
// 	testAddWids(data);
// 	displayAllWids();
// }

function displayAllWids() {

	document.getElementById("divwidsdisplay").innerHTML = "";
	var html = "";
	for(var key in localStorage) {
		//if(key.indexOf(widMasterKey) == 0){
			html += document.getElementById("divwidsdisplay").innerHTML;
			html += "<b>key : </b> " + key + "<br>";
			html += "<b>value : </b> " + JSON.stringify(getFromLocalStorage(key)) + "<br>";
			html += "<br>";
		//}
	}
	document.getElementById("divwidsdisplay").innerHTML =  html;
	updateMemory();
}

