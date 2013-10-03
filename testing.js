// This code is the functionality of the testing environment.

// testSequeceObjList calls SequenceWidObjectCommandActions
// it will then process commands, including calling verifyAddGetWids
// when the verification of the test is called for.

var rerun_test_seq = "";
var did_all_pass = 1;

// Here the que of tests is iterated through
function testSequeceObjList(sequenceObjList, seqList){
	did_all_pass = 1;
	if (seqList) {
		for (seqObjKey in sequenceObjList) {
			var sequenceObj = sequenceObjList[seqObjKey];		

			for (seqKey in seqList) {
				//$('#current_test').text('Current test: ' + seqList[seqKey]);

				var seq = seqList[seqKey];
				if (seq == sequenceObj['seq']) {
					SequenceWidObjectCommandActions(sequenceObj);
					break;
				}		
			}
		}
	} else {
		for (seqObjKey in sequenceObjList){
			var sequenceObj = sequenceObjList[seqObjKey];	
			SequenceWidObjectCommandActions(sequenceObj);
		}
	}
	return did_all_pass;
}

function execute_function (myfunc) {
		if (typeof window[myfunc] == 'function') {
	 	   //alert("I found the function...let's go run it!");
	 	   result = window[myfunc]();
		} else {
			alert('I could not find your function');
		}
}



// This will process each command in the que
function SequenceWidObjectCommandActions(sequenceObj){
	switch(sequenceObj["command.action"]) {
		case 'add':
			//if(sequenceObj["seq"]){
			//	widMasterKey = sequenceObj["seq"];
			//}	
			if (sequenceObj["seq"]) {
				delete sequenceObj["seq"];
			}
			if (sequenceObj["command.action"]) {
				delete sequenceObj["command.action"];
			}	
			AddWidObject(sequenceObj);
			break;

		case 'get':
			if(sequenceObj["seq"]){
				delete sequenceObj["seq"];
			}
			if(sequenceObj["command.action"]){
				delete sequenceObj["command.action"];
			}
			var widObject = getWidMaster(sequenceObj);

				printToDiv('Function SequenceWidObjectCommandActions() GET output : ',  widObject);

			break;
		case 'query':

			relationShipQuery(sequenceObj);
			break;

		case 'clear':
			clearLocalStorage();
			break;

		case 'verify':
			if(sequenceObj["seq"]){
				rerun_test_seq = sequenceObj["seq"];
				delete sequenceObj["seq"];
			}
			if(sequenceObj["command.action"]){
				delete sequenceObj["command.action"];
			}
			did_all_pass = verifyAddGetWids(sequenceObj);
			break;
		// In case the command.action does not fall into the above categories,
		// try to run the function defined in command.action
		default:
			var the_run_function = sequenceObj["command.action"];
			if (the_run_function.length > 0) {
				delete sequenceObj["seq"];
				delete sequenceObj["command.action"];
				execute_function(the_run_function);
			} else {
				alert('Problem with command.action function name. Maybe check spelling?');
			}	

	}
	//resetMasterKey();
}

// When the test is completed, a getwid is compared to an assertion
// The result of that comparison will determine if all the tests still 
// pass, or what has begun to fail.
function verifyAddGetWids(sequenceObj){
	var widName = sequenceObj['verifywid'];
	delete sequenceObj['verifywid'];

	var getWidObject = getFromMongo({'wid': widName});
	delete getWidObject['LOG']

			printToDiv('Function verifyAddGetWids : getWidObject',  getWidObject, 'true');	
			printToDiv('Function verifyAddGetWids : sequenceObj',  sequenceObj, 'true');

	addToLocalStorage(widMasterKey + "verify_" + widName, sequenceObj);
	
	if(!sequenceObj || !getWidObject){
		printToDiv('Function verifyAddGetWids result for test ' + rerun_test_seq + ' : <u>MATCH UNSUCCESSFULL</u> ...either the test is missing, or the results to test are missing. ',  false, 'true');
		alert ('Test: ' + rerun_test_seq + '\nYour test for verify_result_' + widName + ' has failed. ...either the test is missing, or the results to test are missing.');
		// By returning a value of -1, there will be no success alert.
		did_all_pass = -1;
		return did_all_pass;
	}
	
	var result = compareJSON(sequenceObj, getWidObject);

	if (JSON.stringify(result) == '{}'){// equal

			printToDiv('Function verifyAddGetWids result for test ' + rerun_test_seq + ' : <u>MATCH SUCCESSFULL</u> ',  true, 'true');

		result['result'] = "successful";
		addToLocalStorage(widMasterKey + "verify_result_" + widName, result);
	} else {// not equal

				printToDiv('Function testGetWidMaster result: <u>MATCH UNSUCCESSFULL</u> with below difference :- ',  result, 'true');

		result['result'] = "unsuccessful";
		addToLocalStorage(widMasterKey + "verify_result_" + widName, result);
		alert ('Test: ' + rerun_test_seq + '\nYour test for verify_result_' + widName + ' has failed. Review your recent changes to diagnose the sudden failure of this test.');
		// By returning a value of -1, there will be no success alert.
		did_all_pass = -1;
	}
	return did_all_pass;
}

function compareJSON(obj1, obj2) { 
	var ret = {}; 
	for(var i in obj2) { 
		if(!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) { 
			ret[i] = obj2[i]; 
			// start taking out the parameters of the verification object			
		} 
		delete obj1[i];
	} 
	// If there are any parameters left in the verify object(obj1), add it to the results
	if (getObjectSize(obj1) > 0) {
		ret['Verification_fields_left_over'] = obj1;
	}
	return ret; 
	}

function testGetWidMaster() {
	document.getElementById("divprint").innerHTML = "";
	var convertMethod = 'wid';
	//var widParameters = {"wid":"wid1", "dtotype":"widdto", "inherit":"inherit", "convertMethod":"wid", "accessToken":"AccessToken"};
	var widParameters = JSON.parse(document.getElementById("function_parameters").value);
	getwidresult = getWidMaster(widParameters);
	Display_Output(getwidresult);
	printToDiv('Function testGetWidMaster getwidresult: ',  getwidresult, 'true');
}

function testAddWidObject() {
	document.getElementById("divprint").innerHTML = "";
	//var widParameters = input;
	var widParameters = JSON.parse(document.getElementById("function_parameters").value);
	//if(widParameters["seq"]){
	//	widMasterKey = widParameters["seq"];
	//}	
	if(widParameters["seq"]){
		delete widParameters["seq"];
	}
	if(widParameters["command.action"]){
		delete widParameters["command.action"];
	}	
	Wid = AddWidObject(widParameters);
	displayAllWids();
}

function testQueryWid() {
	document.getElementById("divprint").innerHTML = "";
	//var widParameters = {"relationshiprawmongoquery":"set1", "mongotype":"ABC", "mongofilterrawquery":"set1", "mongorelationshipdirection":"forward", "mongorelationshiptype":"attributes", "mongorelationshipmethod":"XYZ", "mongoaggregation":"mongoaggregationvalue", "mongosetlimit":12345, "mongoreturncount":123, "mongoexplain":456, "mongosize":789};
	var widParameters = JSON.parse(document.getElementById("queryparameters").value);
	relationShipQuery(widParameters);
}

function testMongoQuery() {
    document.getElementById("divprint").innerHTML = "";
    var widParameters = JSON.parse(document.getElementById("function_parameters").value);
    MongoDataQuery(widParameters);
}

function testconverttodot() {
    document.getElementById("divprint").innerHTML = "";
    var widParameters = JSON.parse(document.getElementById("converttodotparameters").value);
    convertedResults = ConvertToDOTdri(widParameters);
    printToDiv('Function testconverttodot convertedResults: ',  convertedResults);
    }


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

function Display_Output(data) {
	document.getElementById("Function_Output").innerHTML =  "";
	text = "<br><span><em>Function Output:</em><br><pre style='background: #D1D5D5; color: #339300;'>" + JSON.stringify(data) + "'</pre><br></span>";
	//$('#Function_Output').text(text);
	document.getElementById("Function_Output").innerHTML =  text;
}
//end of testing


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
			html += "<label style='color: red;'>" + key + "</label><br>";
			html += "<label style='color: purple;'>" + JSON.stringify(getFromLocalStorage(key)) + "</label><br>";
			html += "<br>";

			// Old version
			// html += document.getElementById("divwidsdisplay").innerHTML;
			// html += "<b>key : </b> " + key + "<br>";
			// html += "<b>value : </b> " + JSON.stringify(getFromLocalStorage(key)) + "<br>";
			// html += "<br>";
		//}
	}
	document.getElementById("divwidsdisplay").innerHTML =  html;
}



// This is the original copy
// function verifyAddGetWids(sequenceObj){
// 	var widName = sequenceObj['verifywid'];
// 	var getWidObject = getFromMongo({'wid': widName});
// //	var did_all_pass = 1;

// 			printToDiv('Function verifyAddGetWids : getWidObject',  getWidObject, 'true');

// 	delete sequenceObj['verifywid'];
	
// 			printToDiv('Function verifyAddGetWids : sequenceObj',  sequenceObj, 'true');

// 	addToLocalStorage(widMasterKey + "verify_" + widName, sequenceObj);
	
// 	if(!sequenceObj || !getWidObject){
// 		printToDiv('Function verifyAddGetWids result: <u>MATCH UNSUCCESSFULL</u> ...either the test is missing, or the results to test are missing. ',  false, 'true');
// 		return;
// 	}
	
// 	//alert('Verify' + sequenceObj);
// 	var result = compareJSON(sequenceObj, getWidObject);
// 	if (JSON.stringify(result) == '{}'){// equal

// 			printToDiv('Function verifyAddGetWids result: <u>MATCH SUCCESSFULL</u> ',  true, 'true');

// 		result['result'] = "successful";
// 		addToLocalStorage(widMasterKey + "verify_result_" + widName, result);
// 	} else {// not equal

// 				printToDiv('Function testGetWidMaster result: <u>MATCH UNSUCCESSFULL</u> with below difference :- ',  result, 'true');

// 		result['result'] = "unsuccessful";
// 		addToLocalStorage(widMasterKey + "verify_result_" + widName, result);
// 		alert ('Test: ' + rerun_test_seq + '\nYour test for verify_result_' + widName + ' has failed. Review your recent changes to diagnose the sudden failure of this test.');
// 		// By returning a value of -1, there will be no success alert.
// 		did_all_pass = -1;
// 	}
// //	clearLocalStorage();
// 	return did_all_pass;
// }
