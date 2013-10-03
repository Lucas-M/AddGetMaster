function Hello_World() {
	alert('Hello world!');
}

function lukestest(){
// enter a list into seqList of what keystorkes you want to send to system
// seq and command.action are test realted only
// support actions add, get, verify and ...
	var sequenceObjList=[];
	var seqList = ["seq440"];	

	// SEQ440 To test the add wid and verify success
	// Clear the db
	sequenceObjList.push({"seq":"seq450","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq440","command.action":"get","wid":"mary_jane1", "command.dtotype":"authordto"});
	// Verify the get call for mary_jane1
	//sequenceObjList.push({"seq":"seq440","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"author_dto","thisfield":"isextra","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1","LOG":"LOG"});
	sequenceObjList.push({"seq":"seq440","command.action":"Hello_World"});

	testSequeceObjList(sequenceObjList, seqList);
}

function Your_function_name_here(){

	var sequenceObjList=[];
	var seqList = ["seq999"];	

	// SEQ999 Test function template
	// Clear the db
	sequenceObjList.push({"seq":"seq999","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq999","command.action":"add","wid":"person","first":"string","last":"string","age":"string","metadata.method":"person"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq999","command.action":"add","wid":"ricky_bobby","first":"ricky","last":"bobby","metadata.method":"person"});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq999","command.action":"get","wid":"ricky_bobby", "command.dtotype":"person"});
	// Refresh the output window of local storage
	sequenceObjList.push({"seq":"seq999","command.action":"displayAllWids"});
	// To call a function simply enter the function name into command.action
	sequenceObjList.push({"seq":"seq999","command.action":"Hello_World"});

	testSequeceObjList(sequenceObjList, seqList);
}

function aaa(){
// enter a list into seqList of what keystorkes you want to send to system
// seq and command.action are test realted only
// support actions add, get, verify and ...
	var sequenceObjList=[];
	var seqList = ["seq440"];	

	// SEQ440 To test the add wid and verify success
	// Clear the db
	sequenceObjList.push({"seq":"seq440","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});

	for (var i = 1; i< 1000; i++){
		var dummy = {"seq":"seq440","command.action":"add","metadata.method":"authordto1"}
		dummy["wid"] = 'wid' + i;
		sequenceObjList.push(dummy);
		sequenceObjList.push({"seq":"seq440","command.action":"updateMemory"});
	}
 	

	testSequeceObjList(sequenceObjList, seqList);
}
