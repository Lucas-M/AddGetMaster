function getWidMaster(parameters){
	parameters = tolowerparameters(parameters, {'wid':'true', 'metadata.method':'true', 'command.dtotype':'true', 'command.convertmethod':'true', 'command.checkflag':'true', 'command.inherit':'true', 'command.accesstoken':'true'});

//	parameters = tolowerparameters(parameters, parameters['command.convertmethod']);
	var output=getWidMasterLevel(parameters);
	olddebug=Debug;
	Debug='true';
	printToDiv('Function getWidMaster() parameters ' , parameters);
	printToDiv('Function getWidMaster() output ' , output);
	Debug=olddebug;
	// reconvert the external output from metadatamethod to metadata.method
	//	for (item in output) {
	//	if ((output[item].length!==undefined) && (output[item].length!==0) && (item=="metadatamethod")) {
	//		output["metadata.method"]=output[item];
	//		delete output["metadatamethod"];
	//	}
	//}	
	printToDiv('-----Function getwidmaster output II', output);  
	output["LOG"]="LOG";
	printToDiv('-----Function getwidmaster output III', output);  	
	addToLocalStorage(widMasterKey+"get_"+output["wid"], output);
	delete output["LOG"];
	return output;
}

// Starting of getWidMaster function
function getWidMasterLevel(parameters){

	var wid = parameters.wid;
	var resultObj = {};

	printToDiv('Function getWidMasterLevel() incoming parameters' , parameters);

	var dtotype="";
	if(isParameterLower(parameters, "command.dtotype")){
		dtotype=parameters["command.dtotype"];
	}
	
	var inherit="";
	if(isParameterLower(parameters, "command.inherit")){
		inherit=parameters["command.inherit"];
	}

	var accesstoken="";
	if(isParameterLower(parameters, "command.accesstoken")){
		accesstoken=parameters["command.accesstoken"];
	}

	var checkflag="";
	if(isParameterLower(parameters, "command.checkflag")){
		accesstoken=parameters["command.checkflag"];
	}


	var convertMethod="";
	if(isParameterLower(parameters, "command.convertmethod")){
		convertMethod=parameters["command.convertmethod"];
	}


	// resultObj=getFromMongo({'wid':wid});

	// if(
	// 	((dtotype == "") && (res["metadata.method"]!==undefined)) || 
	//     ((dtotype == "") && (parameters["metadata.method"]!==""))) {
	// 	if(isParameterLower(parameters, "metadata.method")
	//    ){
	// 	dtotype=parameters["metadata.method"];
	// 	}

	// 			var dtoGlobalParameters = getFromMongo({'wid':dtotype});
//** dtodefault
//** logic if dtotype not sent in

	//if (dtotype !== "") {
		// security check

		// high level logic: get parent, then get children, then add them together to one result
					printToDiv('Function getWidMasterLevel() accesstoken' , accesstoken);	
					printToDiv('Function getWidMasterLevel() dtotype' , dtotype);	
					printToDiv('Function getWidMasterLevel() inherit' , inherit);
					printToDiv('Function getWidMasterLevel() convertmethod -- not sent ' , convertMethod);


	//}
		//printToDiv('Function getWidMasterLevel() dtoGlobalParameters' , dtoGlobalParameters);			
		// LM: Commented out since currentLevelParameters does not exist.
		//************
		// printToDiv('Function getWidMaster() top level parameters' , currentLevelParameters);
		//************

		// internally we use metadatamethod, not metadata.method

		resultObj = getWidMongo(wid, accesstoken, dtotype, inherit, convertMethod, "", "");

		//**dtoList=objectToList(dtoGlobalParameters);
		//resultList = objectToList(resultObj);
		//resultList = CleanBasedOnCheckflagList(checkflag, resultList, dtoList);
		//resultObj = listToObject(resultList);
		printToDiv('Function getWidMasterlevel() resultObj after listToObject ' , resultObj);
	//} else resultObj = getFromMongo({'wid':wid});
	return resultObj
}

function getWidMongo(widInput, accessToken, dtotype, inherit, convertMethod, dtoGlobalParameters, preAmble) {
	printToDiv('-----Function getWidMongo() in widInput: ', widInput);
	printToDiv('-----Function getWidMongo() in dtotype: ', dtotype);
	printToDiv('--Function getWidMongo() dtoGlobalParameters ', dtoGlobalParameters);
	printToDiv('--Function getWidMongo() preAmble', preAmble);

	if (!widInput) {
		return;
	}

	var outgoingParameters = {};

		//  if(securityCheck(widInput, accessToken)){
		//   return;//stop the execution of function
		//  }

    dtoGlobalParameters={};

	var currentLevelObject = getFromMongo({'wid': widInput});
	printToDiv('--Function getWidMongo() currentLevelObject from mongo ', currentLevelObject);
	printToDiv('-----Function getWidMongo() in dtotype: II', dtotype);
	
	if(dtotype=="")
			{	
			if((currentLevelObject!=="") && 
				(currentLevelObject["metadata.method"]!==undefined) && 
				(currentLevelObject["metadata.method"]=="defaultdto")) {
					dtotype='defaultdto';
				}
			if((currentLevelObject!=="") &&
			(currentLevelObject["metadata.method"]!==undefined) && 
	   		(currentLevelObject["metadata.method"]!=="")) {
				printToDiv('--Function getWidMongo() currentLevelObject[] ', currentLevelObject["metadata.method"]);	
				dtoGlobalParameters=getFromMongo({'wid':currentLevelObject["metadata.method"]});
				printToDiv('--Function getWidMongo() dtoGlobalParameters', dtoGlobalParameters);	
				}
			}
		else
			{
			if (dtotype=='defaultdto') {
				var moreDTOParameters = simpleQuery(widInput, "attributes", "all", "forward", "", "", "");
				for (eachresult in moreDTOParameters) {
					dtoGlobalParameters[eachresult] = 'onetomany'
					} 
				}
			else {
				dtoGlobalParameters=getFromMongo({'wid':dtotype});
				printToDiv('--Function getWidMongo() dtoGlobalParameters', dtoGlobalParameters);
				}
			}

	printToDiv('--Function getWidMongo() dtoGlobalParameters', dtoGlobalParameters);	
	if(inherit){
		var moreParameters = getFromMongo({'wid':inherit});
		if(!moreParameters){
			currentLevelObject = jsonConcat(currentLevelObject,moreParameters);  // if duplicates then currentLevelObject{} wins
			} 
		}

	printToDiv('--Function getWidMongo() currentLevelObject after match', currentLevelObject);	
	var currentLevelObjectList = objectToList(currentLevelObject);
	var dtoGlobalParametersList = objectToList(dtoGlobalParameters);

    if (dtotype!="") 
	    {
	    // ** this conversion could be simplfied

		dtoGlobalParametersList = MatchPrefix(dtoGlobalParameters, preAmble);
		printToDiv('--Function getWidMongo() dtoGlobalParametersList after matchPrefix ', dtoGlobalParametersList);

		dtoGlobalParametersList = dtoGlobalParametersList.match;	
		printToDiv('--Function getWidMongo() dtoGlobalParametersList after matchFilter ', dtoGlobalParametersList);

		dtoGlobalParametersList = DeletePrefix(dtoGlobalParametersList, preAmble);	
		printToDiv('--Function getWidMongo() dtoGlobalParametersList after MatchPrefix', dtoGlobalParametersList);

		// var dtoGlobalParameters = listToObject(dtoGlobalParametersList);
		// printToDiv('--Function getWidMongo() dtoGlobalParameters to object ', dtoGlobalParameters);
		}
		else
		{	
		var currentLevelObjectList = SplitObjectList(currentLevelObjectList, dtoGlobalParametersList);
		currentLevelObjectList = currentLevelObjectList.match;

		currentLevelObject = listToObject(currentLevelObjectList);
		printToDiv('--Function getWidMongo() currentLevelObjectList after match', currentLevelObjectList);
		}


	printToDiv('--Function getWidMongo() currentLevelObject after match', currentLevelObject);		

	outgoingParameters=currentLevelObject;

	for (var item in dtoGlobalParameters) {
		printToDiv('--Function getWidMongo() item ', item);
		printToDiv('--Function getWidMongo() dtoGlobalParameters[item] ', dtoGlobalParameters[item]);
		nextLevelParameters={};
		if (dtoGlobalParameters[item] == "onetoone") { // if dto states 'onetoone' then search for related records that match property
			nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, dtotype, inherit, accessToken, dtoGlobalParameters);
			};
		if (dtoGlobalParameters[item] == "onetomany") { // if dto states 'onetomany' then search for related records that match property
			nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, dtotype, inherit, accessToken, dtoGlobalParameters);
			};
		printToDiv('--Function getWidMongo() nextLevelParameters Loop ', nextLevelParameters);
		printToDiv('--Function getWidMongo() currentLevelObject ', currentLevelObject);
        //var nextLevelParametersObject = {};
        //if (nextLevelParameters && nextLevelParameters.length == 1) {
            // nextLevelParametersObject = nextLevelParameters[0];
        var outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
        printToDiv('--Function getWidMongo() outgoingParameters ', outgoingParameters);
        }
    printToDiv('Function getWidMongo() outgoingParameters end : ', outgoingParameters);
    return outgoingParameters
}

// Starting of getAndFormatNextLevel function
function getAndFormatNextLevel(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, dtotype, inherit, accesstoken, dtoGlobalParameters) {

			printToDiv('-------Function getAndFormatNextLevel() in : widInput', widInput);
			printToDiv('-------Function getAndFormatNextLevel() in : mongowidmethod', mongowidmethod);
			printToDiv('-------Function getAndFormatNextLevel() in : convertmethod', convertmethod);
			printToDiv('-------Function getAndFormatNextLevel() in : dtotype', dtotype);
			printToDiv('-------Function getAndFormatNextLevel() in : dtoGlobalParameters', dtoGlobalParameters);	

	var relatedParameters = simpleQuery(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, dtotype);

			printToDiv('-------Function getAndFormatNextLevel() in : relatedParameters', relatedParameters);
			printToDiv('-------Function getAndFormatNextLevel() in : relatedParameters.length', relatedParameters.length);

	if (relatedParameters == "") {
		return;
	}

	var nextLevelParameters = [];

	//for (var rowresult in relatedParameters) { // for this iteration: wid1: {a:b, c:d}
	for(var iteration = 0 ; (iteration< relatedParameters.length ) ; iteration++ ) {
	var rowresult=relatedParameters[iteration];

			printToDiv('----------Function getAndFormatNextLevel() in : iteration', iteration);		
			printToDiv('----------Function getAndFormatNextLevel() in : current row', rowresult);
			
			//var rowObject = relatedParameters[rowresult];
			//for (item in rowObject) {
			//	var proposedLeft = item;
			//	var proposedRight = rowObject[item];
			//}
		for (key in rowresult) {
		var proposedLeft = key;
		var proposedRight = rowresult[key];
		}

				//iteration++; // proposedRight = {a:b, c:d}
		
				printToDiv('----------Function getAndFormatNextLevel() in : proposedLeft', proposedLeft);
				printToDiv('----------Function getAndFormatNextLevel() in : proposedRight', proposedRight);

				// LM: Found commented. Should delete?
				// ************
				//if (dtotype == 'onetomany') {
				//	proposedLeft == proposedLeft + "<" + iteration + ">"; // if dtotype=x then proposedLeft x<1>
				//}

				//if (convertmethod = "" && relatedParameters.length == 1) {
				//	proposedLeft = dtotype; // proposedLeft=x if only one related and convertmethod="" -- change it to just widdto
				//}
				// ************
				//var proposedObject ={};

		if (convertmethod == "wid") {

					printToDiv('----------Function getAndFormatNextLevel() convertmethod', convertmethod);
					//proposedRight = item; // proposedRight = wid1
					printToDiv('----------Function getAndFormatNextLevel() item', proposedRight);
					//proposedObject[mongowidmethod] = proposedLeft;
					//nextLevelParameters.push({"key":proposedLeft,"value":proposedRight}); // NextLevelParameters =  x<1>: wid1

			nextLevelParameters.push({"key":mongowidmethod,"value":proposedLeft});

					//		printToDiv('----------Function getAndFormatNextLevel() proposed wid object', proposedObject);

			};
					//alert(convertmethod);
		if (convertmethod == "json") {

					//proposedObject[proposedLeft] = proposedRight;
					//nextLevelParameters.push({"key":proposedLeft,"value":proposedRight}); // NextLevelParameters =  x<1>: {a:b, c:d}

			nextLevelParameters.push({"key":mongowidmethod,"value":proposedRight});

					//		printToDiv('----------Function getAndFormatNextLevel() proposed json object', proposedObject);

			};

		if ((convertmethod == "") || (convertmethod == "dto")) {	
			var drillDownParameters = getWidMongo(proposedLeft, accesstoken, dtotype, inherit, convertmethod,dtoGlobalParameters, mongowidmethod);

					printToDiv('----------Function getAndFormatNextLevel() proposed drillDown object: ', drillDownParameters);
					printToDiv('----------Function getAndFormatNextLevel() mongowidmethod: ', mongowidmethod);

			for(var item in drillDownParameters) {
					// LM: original line
					proposedLeft = mongowidmethod + "." + String(iteration) + "." + item;  // removed +1


				if ((convertmethod == "dto") && (relatedParameters.length == 1)) { 
					proposedLeft = mongowidmethod+"."+item; 
					}
				// this should not put brackets if only one child
				proposedRight = drillDownParameters[item];

						printToDiv('----------Function getAndFormatNextLevel() in : proposedLeft', proposedLeft);
						printToDiv('----------Function getAndFormatNextLevel() in : proposedRight', proposedRight);

				nextLevelParameters.push({"key":proposedLeft,"value":proposedRight});

						printToDiv('----------Function getAndFormatNextLevel() forloop nextLevelParameters: ', nextLevelParameters);				
						printToDiv('----------Function getAndFormatNextLevel() drillDown aftr dot: ', drillDownParameters);
						printToDiv('----------Function getAndFormatNextLevel() nextLevelParameters after dot : ', nextLevelParameters);	
						//nextLevelParameters = jsonConcat(nextLevelParameters, drillDownParameters);
						printToDiv('----------Function getAndFormatNextLevel() nextLevelParameters after concat : ', nextLevelParameters);	
				};			
			};

						printToDiv('----------Function getAndFormatNextLevel() nextLevelParameters list result : ', nextLevelParameters);
	}
	nextLevelParametersObject=listToObject(nextLevelParameters);

						printToDiv('----------Function getAndFormatNextLevel() nextLevelParametersObject result : ', nextLevelParametersObject);

	return nextLevelParametersObject;
}

// This tears apart an object with properties that are objects.
// It opens up all the nested objects to create a flat list of properties
// of an object. Then AddWidParameters is called, which in turn calls
// AddMaster to get the wid placed into the db or local storage. Note that 
// nothing calls this except the test. This is the highest level of the adding
// process for DOT notation.
function AddWidObject(inputObject) {
	var OutParameters = ConvertToDOTdri(inputObject); 
	//OutParameters = tolowerparameters(OutParameters, OutParameters['command.convertmethod']);
	Wid = AddWidParameters(OutParameters);
	return Wid;
	
			//printToDiv('Function AddWidObject() Constant input : ', input );
			//printToDiv('Function AddWidObject() ConstandtdtoobjectDOT : ', dtoobjectDOT );
			//printToDiv('Function AddWidObject() Received into addWidObject inputObject : ', inputObject );
			//printToDiv('Function AddWidObject() Sent out from OutParameters : ', OutParameters );
}

// Sets up call to addwidmaster (to add a parameter to the DTO ?)
function AddWidParameters(parameterObject) {

				//printToDiv('Function AddWidParameters()  paramterObject : ',  paramterObject);

	// obj sets up the match and nomatch arrays
	var obj = MatchPrefix(parameterObject, "command");
	// inputParametersList is the part of the DOT that does not match the DTO
	var inputParametersList = obj.nomatch;
	// commandList is the part of the DOT that matches the DTO
	var commandList = obj.match;
	// commandobject makes an object out of the commandlist
	var commandobject = listToObject(commandList);
	var inputParametersObject = listToObject(inputParametersList);


	printToDiv('Function AddWidParameters()  inputParametersObject : ',  inputParametersObject);
	printToDiv('Function AddWidParameters()  commandList : ',  commandobject);
	
	var dtoobject ={};
	var metadata = "";

	commandobject = tolowerparameters(commandobject, {'command.dtotype':'true', 'command.convertmethod':'true', 'command.checkflag':'true', 'command.inherit':'true', 'command.accesstoken':'true'});
	inputParametersObject = tolowerparameters(inputParametersObject, {'metadata.method':'true', 'wid':'true'});

	printToDiv('Function AddWidParameters()  commandList : ',  commandobject);

	var checkflag = commandobject["command.checkflag"];
	var accesstoken = commandobject["command.accesstoken"];
	var inherit = commandobject["command.inherit"];
	var dtotype = commandobject["command.dtotype"];

    printToDiv('Function AddWidParameters()  dtotype : I ',  checkflag);
        printToDiv('Function AddWidParameters()  dtotype : I ',  accesstoken);
            printToDiv('Function AddWidParameters()  dtotype : I ',  inherit);
		
    printToDiv('Function AddWidParameters()  dtotype : I ',  dtotype);
   Debug='false';
	if (inputParametersObject['metadata.method'] !== "") {
		metadata = inputParametersObject['metadata.method'];
		
		//inputParametersObject['metadatamethod'] = dtotypeindex;
		//delete inputParametersObject['metadata.method'];
		dtoobject=getWidMaster({'wid':metadata, 'command.convertmethod':'dto'});
		}
	printToDiv('Function AddWidParameters()  dtoobject : ',  dtoobject);
	if (dtotype!=="") {
    	printToDiv('Function AddWidParameters()  dtotype : II ',  dtotype);
			dtoobject=getWidMaster({'wid':dtotype, 'command.convertmethod':'dto'});
		}
	//Debug='true';

		printToDiv('Function AddWidParameters() dtoobject return: ',  dtoobject);
		printToDiv('Function AddWidParameters() metadata : ',  metadata);

	if (inherit) {
		var moreParameters = getFromMongo({'wid':inherit});
		if (!moreParameters) {
			inputParametersObject = jsonConcat(inputParametersObject,moreParameters);  // if duplicates then currentLevelObject{} wins
		} 
	}
								
	var inputList = objectToList(inputParametersObject);
	var dtoList=objectToList(dtoobject);
	// if (isParameterLower(inputParametersObject, "wid")) {
	// 	if (inputParametersObject["wid"]) {
	// 		ParentWid = inputParametersObject["wid"];
	// 		var result = ProcessBrackets(inputParametersObject, dtoobject, ParentWid, dtotype);
	// 		if (result) {
	// 			inputList = result[0];
	// 			dtoList =  result[1];
	// 		}	
	// 	}
	// }

	// ** ok to go: inputList = CleanBasedOnCheckflagList(checkflag, inputList, dtoList);	

	printToDiv('Function AddWidParameters()  inputList : ',  inputList);
	printToDiv('Function AddWidParameters()  metadata : ',  metadata);
	printToDiv('Function AddWidParameters()  dtoList : ',  dtoList);

	Wid = AddMaster(dtoList, inputList, "",metadata);

	printToDiv('Function AddWidParameters() out : ',  Wid);		

	return Wid;
}

function AddMaster(dtoList, parameterList, widName, dtotype) {
	//Debug='true';
	printToDiv('Function AddMaster : dtoList ', dtoList);	
	printToDiv('Function AddMaster : parameterList', parameterList);	
	printToDiv('Function AddMaster : widName ', widName);	
	printToDiv('Function AddMaster : dtotype', dtotype);	
    var ChildrenListobj = {}; // go through list of incoming parameters to generate a list of childrent dtos
    var dtoobject = listToObject(dtoList); // generate a copy of dtolist that is an object        
    for (key in dtoobject) { // go through each parameter
        if ((dtoobject[key] == 'onetomany') || (dtoobject[key] == 'onetoone')) {
            // see if dto list tells us is a child
            ChildrenListobj[key] = dtoobject[key]; // add it to children object list
        	}
    	}
	printToDiv('Function AddMaster ChildrenListobj: ', ChildrenListobj);

    var ParentdtoList = dtoList; // now go through childrent list and delete from copy of incoming parameters
    var ParentList = parameterList; // anything related to these children

    for (currentparameter in ChildrenListobj) {
        ParentList = MatchDelete(ParentList, currentparameter);
        ParentdtoList = MatchDelete(ParentdtoList, currentparameter);
   		}	

    var ParentObject = {}; // add survivors -- that is the parent
    var ParentWid = '';

    ParentObject = MongoAddEditPrepare(ParentdtoList, ParentList, widName, dtotype);
    ParentWid = ParentObject["wid"];

    var RelatedListParameters = SplitObjectList(parameterList, ParentList); // figure out what the left over parameters are
    	RelatedListParameters = RelatedListParameters.nomatch;
    var RelatedListdto = SplitObjectList(dtoList, ParentdtoList);
    	RelatedListdto = RelatedListdto.nomatch;
	printToDiv('Function AddMaster : RelatedListParameters', RelatedListParameters);	
	printToDiv('Function AddMaster : RelatedListdto', RelatedListdto);	

	olddebug=Debug;
	Debug='true';
	
 	var parameterindexobj = {};
	var currentparameter='';
 	var splitkey =''
 	var currentNumber=0;
	    //if (RelatedListParameters!==[]) {}
	    parameterindexobj = {}; // create a list of (children) parameters that start with number 
	    for(currentcount in RelatedListParameters) {
	    	//printToDiv('Function AddMaster : currentcount', currentcount);	
	  		currentparameter = RelatedListParameters[currentcount].key;
	  		//printToDiv('Function AddMaster : currentparameter', currentparameter);
	        splitkey = currentparameter.split(".");
	        //printToDiv('Function AddMaster : splitkey', splitkey);
	        currentNumber = 0;
	        if (splitkey[1]!==undefined) {currentNumber = Number(splitkey[1])};
	        //printToDiv('Function AddMaster : currentNumber', currentNumber);	
	        if (currentNumber>0) {
	            //printToDiv('Function AddMaster : currentNumber II ', currentNumber);		
	            parameterindexobj[splitkey[1]] = splitkey[0];
	        	}
	    	}
	    printToDiv('Function AddMaster : parameterindexobj I  ', parameterindexobj);	
	    // code below added 10/2 sort parameterindexobj	
	    if (Object.keys(parameterindexobj).length !== 0) {
		    parameterindexobj=parameterindexobj.sort(function(aObj, bObj) {
		   		var a = getAttributeByIndex(aObj, 0);
		   		var b = getAttributeByIndex(bObj, 0);     
		   		if (a < b) return -1;
		   		if (a > b) return 1;
		    	return 0;
		 		});	
			}
	printToDiv('Function AddMaster : parameterindexobj I  ', parameterindexobj);	
	Debug=olddebug;

    var attrtype = "";							// onetoone we will search for only one realted (last), onetomany (all)
    var editflag = "";					// do we need to read (find out widnames) before add
    var attr = "";
    var dtotype = "";
    var ParametersToAdd=[];
    var SplitParameters=[];
    var ChildrendtoList=[];
    var ChildWid='';
    var widtoadd='';
    var widlist = [];
    for(var childrentype in ChildrenListobj) { 	// step through all direct children
    	printToDiv('Function AddMaster : childrentype', childrentype);

    	editflag='false';
        attr = ChildrenListobj[childrentype]; 	// onetoone or onetomany?  -left side of ChildrenListobj is the dto name
        printToDiv('Function AddMaster : attr', attr);
        printToDiv('Function AddMaster : parameterindexobj', parameterindexobj);
        if (Object.keys(parameterindexobj).length !== 0) {	// for this children, any parameters with number?
            editflag = 'true'					// if we had paramterindex, then edit must be true
        	} 
        	
        printToDiv('Function AddMaster : editflag', editflag);        	
        if (attr == 'onetoone') {
            editflag = 'true'; 					// onetoone is alway edit true
            attrtype = 'last';					// onetoone -- read last record
        	}
        if (attr == 'onetomany') {
            attrtype = 'all'					// onetomany --- read all records
       		} 
       	widlist = [];
        if (editflag == 'true') {				// edit means read wids before write -- to get wid names
        										// get list of related wids								
            var widlist = simpleQuery(ParentWid, "attributes", attrtype, "forward", childrentype, "", "");
            printToDiv('Function AddMaster : widlist', widlist);	
        	}

        // do children with numbers first

        SplitParameters = MatchPrefixDelete(RelatedListdto, childrentype);
 	       	ChildrendtoList = SplitParameters.match;
    	    RelatedListdto = SplitParameters.nomatch; 

          // save copy for next iteration
        printToDiv('Function AddMaster : ChildrendtoList - 111', ChildrendtoList);	
        printToDiv('Function AddMaster : RelatedListdto - 111' , RelatedListdto);	

        if (Object.keys(parameterindexobj).length !== 0) {
            for (var currentchild in parameterindexobj) {
            	printToDiv('Function AddMaster : childrenttype.currentchild - 222', childrentype+'.'+currentchild);				
                SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype+'.'+currentchild);	// separate parameters to those that start with curr number
                	ParametersToAdd = SplitParameters.match;
                	RelatedListParameters = SplitParameters.nomatch;		// each iteration relatedlistparamter will become smaller
                printToDiv('Function AddMaster : editflag', editflag);
                if (ParametersToAdd.length!==0) {		
	                widtoadd='';              
	                if ((editflag='true') && (widlist!="")) {
	                	if (widlist[currentchild]!==undefined) {   // removed -1
	                		for (var widName in widlist[currentchild]) {  // removed -1
		               			widtoadd=widName;
		               			}
		               		}
		               	};
	                printToDiv('Function AddMaster : ChildrendtoList - 222', ChildrendtoList);	
	                printToDiv('Function AddMaster : ParametersToAdd - 222 ', ParametersToAdd);	
	                printToDiv('Function AddMaster : widtoadd- 222', widtoadd);	
	                printToDiv('Function AddMaster : childrentype -- 222', childrentype);	
	                ChildWid = AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype);
	                printToDiv('Function AddMaster : came back ChildWid -- 222', ChildWid);	
	                AddMongoRelationship(ParentWid, ChildWid, "attributes");
	                printToDiv('Function AddMaster : came back add relationship -- 222', ChildWid);	
	            	}
            	}
       		}

       	SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype); // split parameters based on childtype
        	ParametersToAdd = SplitParameters.match;						// do right now
        	RelatedListParameters = SplitParameters.nomatch;   				// do next iteration
            printToDiv('Function AddMaster : RelatedListParameters 333', RelatedListParameters);	
            printToDiv('Function AddMaster : ParametersToAdd 333 ', ParametersToAdd);

        //if (ParametersToAdd!=='') {	
        if (ParametersToAdd.length!==0) {	
        	widtoadd='';   // this is to catch onetoone case
            if ((attr=='onetoone') && (widlist!="")) {
            	if (widlist[0]!==undefined) {
            		for (var widName in widlist[0]) {
               			widtoadd=widName;
               			}
               		}
               	};
        	printToDiv('Function AddMaster : ChildrendtoList - 444', ChildrendtoList);	
            printToDiv('Function AddMaster : ParametersToAdd -- 444 ', ParametersToAdd);	
            printToDiv('Function AddMaster : widtoadd- 444', widtoadd);	
            printToDiv('Function AddMaster : childrentype -- 444', childrentype);	
            ChildWid = AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype);
            printToDiv('Function AddMaster : came back ChildWid -- 444', ChildWid);	
            AddMongoRelationship(ParentWid, ChildWid, "attributes");
            printToDiv('Function AddMaster : came back add relationship -- 444', ChildWid);	

        	}	
    }
    return ParentWid
}

// Adds a wid to the database and returns the parent wid (to demonstrate success?)  
// The DTOList and the inputList consist of an input list, index list, and original input list.

function MatchDelete(TargetList, TargetParameter) {      // delete all parameters starting with targetparamter
	var output = [];
	//printToDiv('Function MatchDelete : TargetList ', TargetList);	
	//printToDiv('Function MatchDelete : TargetParameter ', TargetParameter);	
	for (var item in TargetList) {
		//printToDiv('Function MatchDelete item', TargetList[item].key);	
		if ((TargetParameter+'.')!==(TargetList[item].key.substring(0,TargetParameter.length+1))) {
			output.push(TargetList[item]);
			}
		}
		// only items that are not equal to the '.' survive
	printToDiv('Function MatchDelete : output ', output);	
	return output;
}

function MatchPrefixDelete(TargetList, TargetParameter) {
	var targetobject=listToObject(TargetList);
	var split=MatchPrefix(targetobject,TargetParameter);
	var out1=DeletePrefix(split.match, TargetParameter)
	var out2=split.nomatch;
	return {
		match : out1,
		nomatch : out2 
		};
}

function DeletePrefix(arr, kw ) {
	if (kw=="") {return arr}
		else{

	var result = [];

						//printToDiv('Function DeletePrefix arr : ',  arr);   
						//printToDiv('Function DeletePrefix kw : ',  kw);  

	if (arr.length>0  && (kw.length>0)) {           
		for (i = 0; i < arr.length; i++) {
			var obj = arr[i];                
			var objvalue = obj["value"];
			var objkey = obj["key"];

						//printToDiv('Function DeletePrefix objvalue : ',  objvalue); 
						//printToDiv('Function DeletePrefix objkey : ',  objkey);  

			if (objkey != kw) {

						//printToDiv('Function DeletePrefix length.objkey : ',  objkey.length);  
						//printToDiv('Function DeletePrefix length.kw : ',  kw.length); 
						// seems to have big if kw = e and a.x=y then x=y 

				if (objkey.length > kw.length){
					partial = objkey.substring(0,kw.length+1);

						//printToDiv('Function DeletePrefix partial : ',  partial);  

					kwdot=kw+'.';

						//printToDiv('Function DeletePrefix kwdot : ',  kwdot);  

					if (kwdot == partial) {
						afterdot=kw.length+1;

						//printToDiv('Function DeletePrefix afterdot : ',  afterdot);  

						beforekey = objkey;
						objkey = beforekey.substring(afterdot);

						//printToDiv('Function DeletePrefix objkey after substring : ',  objkey);  
					}   
				} 
						//printToDiv('Function DeletePrefix obkey before push : ',  objkey);   

				if (objkey.length > 0) {

						//printToDiv('Function DeletePrefix objkey push : ',  objkey);  

					result.push({"key" : objkey , "value" :  objvalue });

						//printToDiv('Function DeletePrefix objkey push : ',  objkey);	
				}
			}
		} 
	} 
						//printToDiv('Function DeletePrefix result : ',  result);       
	return result;    
}}

// Add all the parameters of b to a. This is the exact same function as
// jsonConcat around line 550-650. Since extend is not used yet, it would be 
// a good idea to just use jsonConcat as it is already in use elsewhere.
function extend(a, b){
	for(var key in b){
		if(b.hasOwnProperty(key)){
			a[key] = b[key];
		}
	}
	return a;
}

// Splits a list of parameters. If the value of a parameter
// is not attr, it will be put into the ParentdtoList. As soon
// as the first parameter of 'onetomany' is found, the rest of 
// the list will be put into the childDTOlist.
function SplitKeywordSet(list, attr ){
	if(typeof(attr) == undefined){
		attr = 'onetomany';
	}

	var ParentdtoList = [];
	var ChildrendtoList = [];
	var attrFoundFlag  = 0;
	
	for(var i= 0;  i < list.length ; i++ ){
		item = list[i];
		if((attrFoundFlag == 0) && (item["value"] != attr )){
			ParentdtoList.push(item);
		}else{
			ChildrendtoList.push(item);
			attrFoundFlag = 1;
		}
	}
	
	var objChildParentdtoList = {
		"parentlist" : ParentdtoList,
		"childrenlist" : ChildrendtoList
	};					
	return objChildParentdtoList;
}

// Sorts a list of arrays based on the length of the array
// The sort will be ascending (a,b as opposed to b,a) unless
// the function returns a value other than 1. To see more
// goto: http://www.javascriptkit.com/javatutors/arraysort2.shtml#.UkF_G4b2qSo
function Sortonetomanys(list, attr){
	printToDiv('Function Sortonetomanys()  list : ',  list);
	printToDiv('Function Sortonetomanys()  attr : ',  attr);
	if(typeof(attr) == undefined){
		attr = 'onetomany'
	}
	output = list.sort(function(a,b) {
		if (a.key.split('.').length < b.key.split('.').length){
			return -1;
		}
		else if (a.key.split('.').length > b.key.split('.').length ){
			return 1;
		}
		else if(a.value == attr){
			return 1;
		}
		else if(b.value == attr){
			return -1;
		}
		else{
			return 0;
		}
	});
	printToDiv('Function Sortonetomanys()  output : ',  output);
	return output;
}

// Looks for the key word in the input and returns those fields that match the DTO in
// the match hash, and those that don't in the nomatch hash. This is used to filter out
// the parameters that the DTO is filtering for.
function MatchPrefix(input, kw) {
	var match = [];
	var nomatch = [];

	if (kw=="") {
		match = objectToList(input);
		return {match:match, nomatch:nomatch}
	}
		else {

				//printToDiv('Function MatchPrefix, kw: ',  kw);
				//printToDiv('Function MatchPrefix, input: ',  input);

	for (key in input) {
		partial = key.substring(0, kw.length + 1); 

		kwdot = kw + '.';
		if ((kwdot == partial) || (kw == key))

				// var arr = key.split('.');
				//var arr = key.substring(0,key.lastIndexOf('.'));
				//printToDiv('Function MatchPrefix arr: ',  arr);
				// if ((arr === kw) || (key === kw)) 

		{
			match.push({ "key": key, "value": input[key] });
		} else {
			nomatch.push({ "key": key, "value": input[key] });
		}
	};
	return {
		match: match,
		nomatch: nomatch
	};
}}


/* lib.js functions */

// Examine the object, if you find a value of 'object', look
// inside that object. If you find a value of 'object', look
// inside....and so on. In the meantime, add the values of the 
// onject into parameters of 'res' (result).
function ConvertToDOTdri(obj) {        //dotize
	var res = {};
	(function recurse(obj, current) {
		for (var key in obj) {
			var value = obj[key];
			var newKey = (current ? current + "." + key : key);  // joined key with dot
			if (value && typeof value === "object") {
				recurse(value, newKey);  // it's a nested object, so do it again
			} else {
				res[newKey] = value;  // it's not an object, so set the property
			}
		}
	} 
	(obj)
	);
	return res;
}

// Deconstructs the dot.notation string into an object that has properties.
function ConvertFromDOTdri(input) {        //Expands to Real javascript object
	var keys = Object.keys(input);
	var result = {};

	for (var i = 0, l = keys.length; i < l; i++) {
		createObjects(result, keys[i].split('.'), input[keys[i]]);
	}
	return result;
}	

// Creates an object with a hash parent:value. If the chain array is more that 1, 
// recurse until there is only 1 chain so you get chain:value returned. This is called only 
// from ConvertFrom DOT, so you can see it part of the process of deconstructing the dot.notaion string.
function createObjects(parent, chainArray, value) {
	if (chainArray.length == 1) {
		parent[chainArray[0]] = value;
		return parent;
	}
	else {
		parent[chainArray[0]] = parent[chainArray[0]] || {};
		return createObjects(parent[chainArray[0]], chainArray.slice(1, chainArray.length), value);
	}
}

// Strips the numbers from hash keys. It returns 3 arrays: input list, index list, and original input list.
// Used by addWidParameters.
function RemoveIndex(input) {
	var result = [];

			//input = { 'a<1>': 'x', 'b<3>': 'y', 'c': 'z', 'd.e': 't', 'f<4>': 'y' };

	var list1 = [];
	var list2 = [];
	var list3 = [];
	
	for (key in input) {
		//case1
		var s1 = key;
		var re = /<(\d+)>/;
		s1 = s1.replace(re, '');

				//console.log(s1);

		var o1 = {};
		o1["key"] = s1;
		o1["value"] = input[key];
		list1.push(o1);

		//case2
		var s2 = key;
		s2 = s2.match(re);
		var o2 = {};
		if (s2) {
			o2["key"] = s1;
			o2["value"] = s2[1];
		} else {
			o2["key"] = s1;
			o2["value"] = '';
		}
		list2.push(o2);

		//case3
		var o3 = {};
		o3["key"] = key;
		o3["value"] = input[key];
		list3.push(o3);
	}

				//console.log(list1);
				//console.log(list2);
				//console.log(list3);

	result.push(list1);
	result.push(list2);
	result.push(list3);

	return result;
}

// Looks to move each item in the input into an object that
// has a match and nomatch hash to see what the DTO has 
// filtered out of the list as relevent fields.
function SplitObjectList(input, dto) {
	var match = [];
	var nomatch = [];
	for (i = 0; i < input.length; i++) {
		var item = input[i];
		var key = item["key"];        
		var found = false;
		for (j = 0; j < dto.length; j++) {
			var subitem = dto[j];
			var subkey = subitem["key"];            
			if (key === subkey) {                
				found = true;
			}
		}
		if (found) {
			match.push(item);
		} else {
			nomatch.push(item);
		}
	}
	return {
		match: match,
		nomatch: nomatch
	};
};

// Returns an object made from an array
function listToObject(arrayOfObjects){
	var finalObject ={};
	if(arrayOfObjects){
		for (var i = 0; i < arrayOfObjects.length; i++) {
			var object = arrayOfObjects[i];
			finalObject[object["key"]] = object["value"];
		}
	}	
	return finalObject;
}

// Returns an array made from an object
function objectToList(object){
	var finalArray = [];
	for(key in object){
		finalArray.push({"key":key, "value":object[key]});
	}
	return finalArray;
}

// Counts the number of hashes in an object
function getObjectSize(parameters){
	var size = 0, key;
	for (key in parameters) {
		if (parameters.hasOwnProperty(key)) size++;
	}
	return size;
}

// Returns true if the parameter is lower case
function isParameterLower(parameters, str) {
	getObjectSize(parameters); 
	var length;
	if(parameters.length === undefined) {
		length = getObjectSize(parameters);
	}else {
		length = parameters.length
	}
	for (key in parameters) {	//rewritten
		if(key.toLowerCase()==str){
			return true;
		}
	}
}

// Finds the first key in parameters that matches the string, or nothing if none is found	
function firstOrDefault(parameters, str) {
	var length;
	if(parameters.length === undefined) {
		length = getObjectSize(parameters);
	}else {
		length = parameters.length
	}
	for (key in parameters) {	//rewritten
		if(key.toLowerCase()==str){
			return key;
		}
	}
}

// Deletes a hash from an object	
function remove(parameters, str){
	var length;
	if(parameters.length === undefined) {
		length = getObjectSize(parameters);
		for (key in parameters) {	//rewritten
			if(key.toLowerCase()==str){
				delete  parameters[key];
			}
		}
	}else {
		length = parameters.length
	}
}

// Creates output based on whether the flas is DTO or JSON. It formates
// the DTO strings with quotes around the values. For JSON, it checks to make sure that
// numbers are actual numbers, and strings have quotes around them.
function CleanBasedOnCheckflagList(flag, input, dto) {
	output  = input;

	if (flag === "dto") {
		for (i = 0; i < output.length; i++) {
			var item = output[i];
			var key = item["key"];            
			for (j = 0; j < dto.length; j++) {
				var subitem = dto[j];
				var subkey = subitem["key"];
				if (key === subkey) {
					if(subitem["value"].toLowerCase() == 'string' ){
						output[i]["value"] = '"' + output[i]["value"] + '"';
					} 
				}
			}            
		}
	}
	
	if (flag == "json") {
		for (i = 0; i < output.length; i++) {
			var item = output[i];
			var key = item["key"];            
		   for (j = 0; j < dto.length; j++) {
				var subitem = dto[j];
				var subkey = subitem["key"];
				if (key === subkey) {
					if((typeof(item["value"]) == 'object') && (item["value"]['number'] !== undefined)){
						output[i]["value"] = item["value"]['number'];
					}
					else{
						if(subitem["value"].toLowerCase() == 'string' ){
							output[i]["value"] = '"' + output[i]["value"] + '"';
						}
					}   
				} 
			}            
		}
	}
				//console.log(output);
	return output;
}

function tolowerparameters(parameters, rightparameters){
 printToDiv('Function tolowerparameters : input parameters',  parameters);
 printToDiv('Function tolowerparameters : input rightparameters',  rightparameters);
 var outputparameters={};
 for(eachparameter in rightparameters){
  	outputparameters[eachparameter]="";
  }
 for(eachparameter in parameters){
  	if (rightparameters[eachparameter.toLowerCase()]=='true'){
   	outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter].toLowerCase();
  }else{
   	outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter];
  }
 }
 printToDiv('Function tolowerparameters : output outputparameters',  outputparameters);
 return outputparameters;
}

//rightparameters && rightparameters[eachparameter] && 


function getAttributeByIndex(obj, index){
 var i = 0;
 for (var attr in obj){
  if (index === i){
   return  attr;
  }
  i++;
 }
 return null;
}

// Adds the key of object2 to object 1
function jsonConcat(o1, o2) {
	for (var key in o2) {
		if (o1[key]===undefined) {
			o1[key] = o2[key];
			}
	}
	return o1;
}

// Returns if o is a string or not
function isString(o) {
	return typeof o == "string" || (typeof o == "object" && o.constructor === String);
}

// Returns true if the val is an int, or false
function isInteger(val) {
  return val.match(/^[0-9]$/);
}

// Returns the number of hashes in an object
function countKeys(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
}
