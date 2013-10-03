	// when html starts it will call starttest
// different calls in starttest can be modified to do different things
// this is a good place to pre enter data or to do random tests
//
// Debug = 'true' will make printdivs work

Debug = 'false';

function starttest(){
	//bootprocess();
	clearLocalStorage();
	testAddWids();
	displayAllWids();
}

function RerunPassingTests() {
	clearLocalStorage();
	RunPassingTests();
	displayAllWids();
}

function bootprocess() {
	var parameters = {"wID":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1.1.name":"The Shining","booksdto1.ISBN":"33003333319","booksdto1.publisher":"Penguin Inc.","metadata.meTHod":"authordto1"};
	var rightsideparameters =  {"last":"true"};
	printToDiv('Function to lower ',  parameters);
	x = tolowerparameters(parameters, rightsideparameters);
	printToDiv('Function to lower ',  x);

	// returnfromSimpleQuery=[];
	// returnfromSimpleQuery.push({"wid":"2", "x":"b"});
	// returnfromSimpleQuery.push({"wid":"4", "x":"d"});
	// returnfromSimpleQuery.push({"wid":"3", "x":"c"});
	// returnfromSimpleQuery.push({"wid":"1", "x":"a"});
	// 
	// returnfromSimpleQuery=[{"5":{"metadatamethod":"booksdto1"}},{"1":{"name":"Time and Terror","ISBN":"10001111419","publisher":"Mega Books Inc.","metadatamethod":"booksdto1"}},{"3":{"metadatamethod":"booksdto1"}}];
	// printToDiv('Function simpleQuery in : returnfromSimpleQuery',  returnfromSimpleQuery);
 //    returnfromSimpleQuery=returnfromSimpleQuery.sort(function(aObj, bObj) {
 //   	var a = getAttributeByIndex(aObj, 0);
 //   	var b = getAttributeByIndex(bObj, 0);
 //   	printToDiv('Function bootprocess',  a);
 //   	printToDiv('Function bootprocess',  b);        
 //   	if (a < b) return -1;
 //   	if (a > b) return 1;
 //    return 0;
 // });
	// printToDiv('Function simpleQuery in : returnfromSimpleQuery',  returnfromSimpleQuery);
	// Debug='false';
	// return returnfromSimpleQuery;

}

function RunPassingTests() {

	var sequenceObjList=[];
	var seqList = ["seq440"];

// ******** When running this function, make sure to use the command.action:cleardb.
// ******** This will allow the next test to have a clean db to work with.

	//***************** SIMPLE ADD A PRIMARY WID AND THREE SECONDARY (ONE TO MANY) RELATED WIDS
	//creates a new dto for entering authors and their books. authors have a "one-to-many" relationship with books
	sequenceObjList.push({"seq":"seq00","command.action":"add","metadata.method":"bookdto","wid":"bookdto","title":"string","publisher":"string"});
	sequenceObjList.push({"seq":"seq00","command.action":"add","metadata.method":"authordto","wid":"authordto","name":"string","age":"string","bookdto":"onetomany","bookdto.title":"string","bookdto.publisher":"string"});
	//adds three books for the author "Mary Sue"
	sequenceObjList.push({"seq":"seq00","command.action":"add","metadata.method":"authordto","wid":"mary_sue","name":"Mary Sue","age":"34","bookdto.title":"Into the Blue","bookdto.publisher":"Mega Books LLC"});
	sequenceObjList.push({"seq":"seq00","command.action":"add","metadata.method":"authordto","wid":"mary_sue","name":"Mary Sue","age":"34","bookdto.title":"Attack on Pearl Harbor","bookdto.publisher":"History Pub Co."});
	sequenceObjList.push({"seq":"seq00","command.action":"add","metadata.method":"authordto","wid":"mary_sue","name":"Mary Sue","age":"34","bookdto.title":"Tower of Fright","bookdto.publisher":"Chills Inc."});
	//gets "Mary Sue" and her thee books
	sequenceObjList.push({"seq":"seq00","command.action":"get","wid":"mary_sue"});
	sequenceObjList.push({"seq":"seq00","command.action":"verify","metadata.method":"authordto","wid":"mary_sue","name":"Mary Sue","age":"34","bookdto.1.title":"Into the Blue","bookdto.1.publisher":"Mega Books LLC","bookdto.1.metadata.method":"bookdto","bookdto.1.wid":"1","bookdto.2.title":"Attack on Pearl Harbor","bookdto.2.publisher":"History Pub Co.","bookdto.2.metadata.method":"bookdto","bookdto.2.wid":"3","bookdto.3.title":"Tower of Fright","bookdto.3.publisher":"Chills Inc.","bookdto.3.metadata.method":"bookdto","bookdto.3.wid":"5","LOG":"LOG"});
	//*****************
	
	// SEQ440 To test the add wid and verify success
	// Clear the db
	sequenceObjList.push({"seq":"seq440","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq440","command.action":"get","wid":"mary_jane1", "command.dtotype":"authordto"});
	// Verify the get call for mary_jane1
	sequenceObjList.push({"seq":"seq440","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"author_dto","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1","LOG":"LOG"});


// ******* Use SEQ441 test to trigger a failed test. In theory, all the tests will pass and
// ******* trigger an alert to say as just that. If you want to test the rerunning of the
// ******* known good tests and be sure the failure is caught, use test 441.

	// // SEQ441 To test the add wid and verify success
	// // Clear the db
	// sequenceObjList.push({"seq":"seq441","command.action":"cleardb"});
	// // Create class description of author by creating authordto1
	// sequenceObjList.push({"seq":"seq441","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	// // Create the author with the authordto1
	// sequenceObjList.push({"seq":"seq441","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});
	// // Generate a get call for mary_jane1
	// sequenceObjList.push({"seq":"seq441","command.action":"get","wid":"mary_jane1", "command.dtotype":"authordto"});
	// // Verify the get call for mary_jane1
	// sequenceObjList.push({"seq":"seq441","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"author_dto","wid":"*********mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1","LOG":"LOG"});


	// SEQ450 -- Create an author and books associated with the author.
	// Clear the db
	sequenceObjList.push({"seq":"seq450","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany"});
	// Create class description of book by creating bookdto1
	sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});
	// Create the relationship between the author and the book
	sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	// Create the 1st of 3 books
	sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc.","metadata.method":"authordto1"});

	sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"mary_jane1","first":"BMary","last":"BSue","age":"3B0","booksdto1.name":"BPawn Of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc.","metadata.method":"authordto1"});

	sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30","booksdto1.name":"CThe Shining","booksdto1.ISBN":"C33003333319","booksdto1.publisher":"CPenguin Inc.","metadata.method":"authordto1"});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq450","command.action":"get","wid":"mary_jane1","command.dtotype":"authordto1"});
	// Verify the get call for mary_jane1
	sequenceObjList.push({"seq":"seq450","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"authordto1","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30","booksdto1.1.name":"ATime and Terror","booksdto1.1.isbn":"A10001111419","booksdto1.1.publisher":"AMega Books Inc.","booksdto1.1.metadata.method":"booksdto1","booksdto1.1.wid":"1","booksdto1.2.name":"BPawn Of Prophecy","booksdto1.2.isbn":"B33003222219","booksdto1.2.publisher":"BTor Books Inc.","booksdto1.2.metadata.method":"booksdto1","booksdto1.2.wid":"3","booksdto1.3.name":"CThe Shining","booksdto1.3.isbn":"C33003333319","booksdto1.3.publisher":"CPenguin Inc.","booksdto1.3.metadata.method":"booksdto1","booksdto1.3.wid":"5","LOG":"LOG"});

	// SEQ350 -- Create an author and books associated with the author.
	sequenceObjList.push({"seq":"seq350","command.action":"clear"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc.","metadata.method":"authordto1"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"mary_jane1","first":"BMary","last":"BSue","age":"3B0","booksdto1.name":"BPawn Of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc.","metadata.method":"authordto1"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30","booksdto1.1.name":"CThe Shining","booksdto1.ISBN":"C33003333319","booksdto1.publisher":"CPenguin Inc.","metadata.method":"authordto1"});


	// Roger, this is the problem, you needed a get_mary_jane1 to apply the verify to
	//sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"mary_jane1"});
	sequenceObjList.push({"seq":"seq350","command.action":"get","wid":"mary_jane1","command.dtotype":"authordto1"});

	sequenceObjList.push({"seq":"seq350","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"authordto1","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30","booksdto1.1.name":"CThe Shining","booksdto1.1.metadata.method":"booksdto1","booksdto1.1.wid":"1","booksdto1.1.isbn":"A10001111419","booksdto1.1.publisher":"AMega Books Inc.","booksdto1.2.name":"BPawn Of Prophecy","booksdto1.2.isbn":"B33003222219","booksdto1.2.publisher":"BTor Books Inc.","booksdto1.2.metadata.method":"booksdto1","booksdto1.2.wid":"3","booksdto1.3.isbn":"C33003333319","booksdto1.3.publisher":"CPenguin Inc.","booksdto1.3.metadata.method":"booksdto1","booksdto1.3.wid":"5","LOG":"LOG"});
	//{"metadata.method":"authordto1","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30",
	//"booksdto1.1.name":"CThe Shining","booksdto1.1.metadata.method":"booksdto1","booksdto1.1.wid":"1",
	//"booksdto1.1.isbn":"A10001111419","booksdto1.1.publisher":"AMega Books Inc.",
	//"booksdto1.2.name":"BPawn Of Prophecy","booksdto1.2.isbn":"B33003222219","booksdto1.2.publisher":"BTor Books Inc.",
	//"booksdto1.2.metadata.method":"booksdto1","booksdto1.2.wid":"3",
	//"booksdto1.3.isbn":"C33003333319","booksdto1.3.publisher":"CPenguin Inc.","booksdto1.3.metadata.method":"booksdto1","booksdto1.3.wid":"5"}

	// Execute the tests
	var did_all_pass = testSequeceObjList(sequenceObjList, seqList);
	if (did_all_pass != -1) {
		alert ('All of the tests still passed');
	} else {
		alert ('Sorry...some of your tests failed.')
	}
}



function testAddWids(){
// enter a list into seqList of what keystorkes you want to send to system
// seq and command.action are test realted only
// support actions add, get, verify and ...
	var sequenceObjList=[];
	var seqList = ["seq440"];	

	// if (data_set != null) {
	// 	seqList = ["seq" + data_set];
	// }


	
	sequenceObjList.push({"seq":"seq16","command.action":"add","metadata.method":"bookdto","wid":"bookdto","title":"string","publisher":"string"});
	sequenceObjList.push({"seq":"seq16","command.action":"add","metadata.method":"authordto","wid":"authordto","name":"string","age":"string","bookdto":"onetomany","bookdto.title":"string","bookdto.publisher":"string"});
	//adds three books for the author "Mary Sue"
	sequenceObjList.push({"seq":"seq16","command.action":"add","metadata.method":"authordto","wid":"mary_sue","name":"Mary Sue","age":"34","bookdto.title":"Into the Blue","bookdto.publisher":"Mega Books LLC"});
	sequenceObjList.push({"seq":"seq16","command.action":"add","metadata.method":"authordto","wid":"mary_sue","name":"Mary Sue","age":"34","bookdto.title":"Attack on Pearl Harbor","bookdto.publisher":"History Pub Co."});
	sequenceObjList.push({"seq":"seq16","command.action":"add","metadata.method":"authordto","wid":"mary_sue","name":"Mary Sue","age":"34","bookdto.title":"Tower of Fright","bookdto.publisher":"Chills Inc."});
	//gets "Mary Sue" and her thee books
	sequenceObjList.push({"seq":"seq16","command.action":"get","wid":"mary_sue"});
	
	
	//***************** SIMPLE ADD A PRIMARY WID AND THREE SECONDARY (ONE TO ONE) RELATED WIDS
	//creates a new dto for a person and their driver's license. people have a "one-to-one" relationship with their license
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"licensedto","wid":"licensedto","Id":"string","state":"string"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"persondto","wid":"persondto","name":"string","age":"string","gender":"string","licensedto":"onetoone","licensedto.Id":"string","licensedto.state":"string"});
	//adds three different driver's license for the person "John Everest" (note: each add should overwrite the previous as this is "one to one")
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"35","gender":"male","licensedto.Id":"27837584029","licensedto.state":"MI"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"35","gender":"male","licensedto.Id":"45863930293","licensedto.state":"TX"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"35","gender":"male","licensedto.Id":"10294483051","licensedto.state":"AZ"});
	//gets "John Everest" and his latest driver's license
	sequenceObjList.push({"seq":"seq01","command.action":"get","wid":"john_everest"});


	sequenceObjList.push({"seq":"seq15","command.action":"add","metadata.method":"persondto","wid":"persondto","name":"string","age":"string","gender":"string","licensedto":"onetoone","licensedto.Id":"string","licensedto.state":"string"});
	//adds three different driver's license for the person "John Everest" (note: each add should overwrite the previous as this is "one to one")
	sequenceObjList.push({"seq":"seq15","command.action":"add","metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"35","gender":"male","licensedto.Id":"27837584029","licensedto.state":"MI"});
	sequenceObjList.push({"seq":"seq15","command.action":"add","metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"35","gender":"male","licensedto.Id":"45863930293","licensedto.state":"TX"});
	sequenceObjList.push({"seq":"seq15","command.action":"add","metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"35","gender":"male","licensedto.Id":"10294483051","licensedto.state":"AZ"});
	//gets "John Everest" and his latest driver's license
	sequenceObjList.push({"seq":"seq15","command.action":"get","wid":"john_everest"});
	//*****************
	
	
	//***************** ADDS A PRIMARY WID WITH TWO SECONDARY WIDS AND THEN UPDATES THOSE TWO SECONDARY WIDS
	//creates a new dto for a company and its workers. companies have a "one-to-many" relationship with workers.
	sequenceObjList.push({"seq":"seq02","command.action":"add","metadata.method":"workersdto","wid":"workersdto","name":"string","position":"string"});
	sequenceObjList.push({"seq":"seq02","command.action":"add","metadata.method":"companydto","wid":"companydto","name":"string","address":"string","city":"string","state":"string","workersdto":"onetomany","workersdto.name":"string","workersdto.position":"string"});
	//adds a company called with two workers and then updates these two workers
	//adding the two workers
	sequenceObjList.push({"seq":"seq02","command.action":"add","metadata.method":"companydto","wid":"us_power","name":"US Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.name":"John Cole","workersdto.position":"electrician"});
	sequenceObjList.push({"seq":"seq02","command.action":"add","metadata.method":"companydto","wid":"us_power","name":"US Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.name":"Susan Grant","workersdto.position":"accountant"});
	//updates "John Cole" to a new position of "Master Electrician"
	sequenceObjList.push({"seq":"seq02","command.action":"add","metadata.method":"companydto","wid":"us_power","name":"US Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.1.name":"John Cole","workersdto.1.position":"Master Electrician"});
	//updates "Susan Grant" to have a new name "Susan Willows" and a new positions as "auditor"
	sequenceObjList.push({"seq":"seq02","command.action":"add","metadata.method":"companydto","wid":"us_power","name":"US Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.2.name":"Susan Willows","workersdto.2.position":"Auditor"});
	//gets the "US Power Co." wid to show us the updated wids
	sequenceObjList.push({"seq":"seq02","command.action":"get","wid":"us_power"});
	//*****************
	
	//***************** ADD A COMPLEX DTO, CREATE A WID WITH THAT DTO, AND THEN SEE THE WID (GET)
	//creates a new dto for a school. The school is has a onetomany with departmentsdto. departmentsdto has a onetomany with classesdto. classesdto has a onetoone with teacherdto.
	//this model represents a school with many departments, each department having many classes, and each class having one teacher.
	sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"teacherdto","wid":"teacherdto","name":"string","age":"string"});
	sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"classesdto","wid":"classesdto","name":"string","section":"string","teacherdto":"onetoone","teacherdto.name":"string","teacherdto.age":"string"});
	sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"departmentsdto","wid":"departmentsdto","name":"string","supervisor":"string","classesdto":"onetomany","classesdto.name":"string","classesdto.section":"string","classesdto.teacherdto":"onetoone","classesdto.teacherdto.name":"string","classesdto.teacherdto.age":"string"});
	sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"schooldto","wid":"schooldto","name":"string","address":"string","departmentsdto":"onetomany","departmentsdto.name":"string","departmentsdto.supervisor":"string","departmentsdto.classesdto":"onetomany","departmentsdto.classesdto.name":"string","departmentsdto.classesdto.section":"string","departmentsdto.classesdto.teacherdto":"onetoone","departmentsdto.classesdto.teacherdto.name":"string","departmentsdto.classesdto.teacherdto.age":"string"});
	//now let's add a school called MSU with a departments called Computer Science. This departments will have a class called Programming Logic & Design, and this class will be taught by Richard Smith.
	sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"schooldto","wid":"msu_richard_smith","name":"MSU","address":"East Lansing","departmentsdto.name":"Computer Science","departmentsdto.supervisor":"The Todd","departmentsdto.classesdto.name":"Programming Logic & Design","departmentsdto.classesdto.section":"5303","departmentsdto.classesdto.teacherdto.name":"Richard Smith","departmentsdto.classesdto.teacherdto.age":"40"});
	//now let's see the school information we added:
	sequenceObjList.push({"seq":"seq03","command.action":"get","wid":"msu_richard_smith"})
	//*****************
	
	//***************** SIMPLE ADD A PRIMARY WID AND TWO SECONDARY (ONE TO MANY) WIDS
	sequenceObjList.push({"seq":"seq04","command.action":"add","metadata.method":"restaurantdto1","wid":"restaurantdto1","name":"string","address":"string","resworkersdto1":"onetomany","resworkersdto1.name":"string","resworkersdto1.position":"string"});
	sequenceObjList.push({"seq":"seq04","command.action":"add","metadata.method":"restaurantdto1","wid":"apple_bees1","name":"Apple Bees","address":"TC","resworkersdto1.name":"John Carney","resworkersdto1.position":"cook"});
	sequenceObjList.push({"seq":"seq04","command.action":"add","metadata.method":"restaurantdto1","wid":"apple_bees1","name":"Apple Bees","address":"TC","resworkersdto1.name":"Sue Mi","resworkersdto1.position":"waitress"});
	sequenceObjList.push({"seq":"seq04","command.action":"get","wid":"apple_bees1"});
	
	//************* SIMPLE TEST CONVERTMETHOD = WID
	// add a notebook dto with a "one to many" relationship with notes. A notebook has an owner and a number of pages. A note has a page number and a comment.
	sequenceObjList.push({"seq":"seq07","command.action":"add","metadata.method":"notebookdto","wid":"notebookdto","owner":"string","pages":"number","pagedto":"onetomany","pagedto.pagenumber":"number","pagedto.notes":"string"});
	// add a note to a notebook owned by Cody Priest
	sequenceObjList.push({"seq":"seq07","command.action":"add","metadata.method":"notebookdto","wid":"notebook1","owner":"Cody Priest","pages":"200","pagedto.pagenumber":"30","pagedto.notes":"the unexamined life is not worth living"});
	// get the newly added notebook and note with convertmethod = wid
	sequenceObjList.push({"seq":"seq07","command.action":"get","wid":"notebook1","command.convertmethod":"wid"});
	
	
	//************* SIMPLE TEST CONVERTMETHOD = JSON
	// add a textbook dto with a "one to many" relationship with chapters. A textbook has an author and a title. A chapter has a title and a page number.
	sequenceObjList.push({"seq":"seq08","command.action":"add","metadata.method":"textbookdto","wid":"textbookdto","author":"string","title":"string","chapterdto":"onetomany","chapterdto.title":"string","chapterdto.pagenumber":"number"});
	// add a note to a notebook owned8by Cody Priest
	sequenceObjList.push({"seq":"seq08","command.action":"add","metadata.method":"textbookdto","wid":"microtext1","author":"Jeffrey Perkins","title":"Microbiology","chapterdto.title":"Viruses","chapterdto.pagenumber":"120"});
	// get the newly added notebook and note with convertmethod = wid
	sequenceObjList.push({"seq":"seq08","command.action":"get","wid":"microtext1","command.convertmethod":"json"});
	
	
	//************* SIMPLE TEST CHECKFLAG = DTO
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	sequenceObjList.push({"seq":"seq09","command.action":"add","metadata.method":"companydto2","wid":"companydto2","name":"string","city":"string","productdto2":"onetomany","productdto2.name":"string","productdto2.calories":"number"});
	sequenceObjList.push({"seq":"seq09","command.action":"add","metadata.method":"companydto2","command.checkflag":"dto","wid":"kellog_ff","name":"Kellogs","city":"MA","productdto2.name":"Frosted Flakes","productdto2.calories":"120"});
	sequenceObjList.push({"seq":"seq09","command.action":"get","wid":"kellog_ff"});
	
	//************* SIMPLE TEST CHECKFLAG = JSON
	// add a companydto with product brands. In this case, Kellog and their Fruit Loops
	sequenceObjList.push({"seq":"seq11","command.action":"add","metadata.method":"companydto3","wid":"companydto3","name":"string","city":"string","productdto3":"onetomany","productdto3.name":"string","productdto3.calories":"number"});
	sequenceObjList.push({"seq":"seq11","command.action":"add","metadata.method":"companydto3","command.checkflag":"json","wid":"kellog_fl","name":"{'string':'Kellogs'}","city":"{'string':'NY'}","productdto3.name":"{'string':'Fruit Loops'}","productdto3.calories":"{'number':'100'}"});
	sequenceObjList.push({"seq":"seq11","command.action":"get","wid":"kellog_fl"});
	
	// add 12 records for Mongo
	// books and authors
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"authordto","name":"string","age":"string","bookdto11":"onetomany","bookdto.title":"string","bookdto.publisher":"string","spousedto":"onetoone","spousedto.name":"string","spousedto.age":"string"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"joe_parks","name":"Joe Parks","age":"34","bookdto11.title":"The Great One","bookdto.publisher":"Mega Books LLC.","spouse.name":"Kelly Parks","spouse.age":"30"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"joe_parks","name":"Joe Parks","age":"34","bookdto11.title":"Our Darkest Hour","bookdto.publisher":"Mega Books LLC."});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto11.title":"Pearl Harbor","bookdto.publisher":"History Pub"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto11.title":"World War I: Close-Up","bookdto.publisher":"History Pub"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto11.title":"World War II: Hitler's Defeat","bookdto.publisher":"History Pub"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto11.title":"Hotel Horror","bookdto.publisher":"Chills Inc."});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto11.title":"Freaky Friday","bookdto.publisher":"Spooks R Us"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto11.title":"Ghost in the Prism","bookdto.publisher":"Chills Inc."});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto11.title":"Mind Blender","bookdto.publisher":"Spooks R Us"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"grace_williams","name":"Grace Williams","age":"24","bookdto11.title":"The Final Fantasy","bookdto.publisher":"Mega Books LLC","spouse.name":"Ted Williams","spouse.age":"28"});
	sequenceObjList.push({"seq":"seq06","command.action":"add","command.dtotype":"authordto11","wid":"grace_williams","name":"Grace Williams","age":"24","bookdto11.title":"The Knife at Her Throat","bookdto.publisher":"Del Ray"});
	
	sequenceObjList.push({"seq":"seq10","command.action":"add","wid":"authordto1","command.dtotype":"authordto1","first":"string","last":"string","age":"string","booksdto1":"onetomany","booksdto1.name":"string","booksdto1.ISBN":"string","booksdto1.publisher":"string"});
	sequenceObjList.push({"seq":"seq10","command.action":"add","command.dtotype":"authordto1","wid":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1.name":"Time and Terror","booksdto1.ISBN":"10003458419","booksdto1.publisher":"Mega Books Inc."});
	sequenceObjList.push({"seq":"seq10","command.action":"get","wid":"mary_jane1", "command.dtotype":"authordto1", "command.inherit":"inherit", "command.convertmethod":"", "command.accesstoken":"accesstoken"});
	sequenceObjList.push({"seq":"seq10","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"author_dto","wid":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1<1>.name":"Time and Terror","booksdto1<1>.ISBN":"10003458419","booksdto1<1>.publisher":"Mega Books Inc.","booksdto1<2>.name":"Time and Terror","booksdto1<2>.ISBN":"10003458419","booksdto1<2>.publisher":"Mega Books Inc."});
	
	sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'schoolDTO', 'metadata.method': 'schoolDTO', 'schoolname': 'string', 'country': 'string' });
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'teacherDTO', 'metadata.method': 'teacherDTO', 'teachername': 'string'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'teachertypeDTO', 'metadata.method': 'teachertypeDTO', 'degree': 'string'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'studentDTO', 'metadata.method': 'studentDTO', 'studentname': 'string', 'country': 'string'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'compositeschoolDTO', 'metadata.method': 'compositschoolDTO', 'schoolname': 'string', 'county': 'string', 'teacherDTO.teacherdegreeDTO': 'onetoone', 'teacherDTO.studentDTO': 'onetomany', 'teacherDTO': 'onetomany', 'teacherTypeDTO': 'onetoone', 'teacherDTO.teachername': 'string', 'teacherDto.degree': 'string', 'teacherDTO.strudentDTO.studentname': 'string', 'teacherDTO.studentDTO.country': 'string'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'compositeteacherDTO', 'metadata.method': 'compositeteacherDTO', 'teachername': 'string', 'degree': 'string', 'studentDTO.studentname': 'string', 'studentDTO.country': 'string', 'studentDTO': 'onetomany'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'teacherbob', 'teachername': 'bob', 'metadata.method': 'teacherDTO','favoritecolor':'blue'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid': 'studenttom', 'studentname': 'tom', 'metadata.method': 'studentDTO','favoritecolor':'green'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','primarywid': 'teacherbob', 'secondarywid': 'studenttom', 'relationshiptype': 'attribute'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid':'wid100','a':'string','b':'string'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid':'wid101','a':'onetomany'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid':'wid103', 'a.x': 'string', 'c': 'string', 'e': 'string', 'g.w': 'string', 'g.t': 'string', 'a': 'onetomany', 'g': 'onetomany' });

    sequenceObjList.push({'seq':'seq42','command.action':'add','wid':'wid2', 'teachername':'bob', 'studentname':'tom'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','bob':'','mongorelationshipdirection:':'forward','mongorelationshipmethod':'first','mongorelationshiptype':'attribute'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid':'wid9001', 'wid9002':'placeholder', 'wid9003':'placeholder'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid':'wid9002', 'teachername':'teacherbob', 'studentname':'studenttom'});
    sequenceObjList.push({'seq':'seq42','command.action':'add','wid':'wid9003', 'favoritecolor':'green'});


sequenceObjList.push({"seq":"seq100","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});

sequenceObjList.push({"seq":"seq100","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});

sequenceObjList.push({"seq":"seq100","command.action":"add","wid":"compositeauthordto","first":"string","last":"string","age":"string","booksdto1":"onetomany","booksdto1.name":"string","booksdto1.ISBN":"string","booksdto1.publisher":"string","metadata.method":"compositeauthordto"});

sequenceObjList.push({"seq":"seq100","command.action":"add","wid":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1.name":"Time and Terror","booksdto1.ISBN":"10003458419","booksdto1.publisher":"Mega Books Inc.","metadata.method":"compositeauthordto"});

sequenceObjList.push({"seq":"seq100","command.action":"get","wid":"mary_jane1"});

sequenceObjList.push({"seq":"seq100","command.action":"get","wid":"mary_jane1", "command.dtotype":"compositeauthordto"});



sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany"});

sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});

sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});

sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1.name":"Time and Terror","booksdto1.ISBN":"10001111419","booksdto1.publisher":"Mega Books Inc.","metadata.method":"authordto1"});

sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1.name":"Pawn Of Prophecy","booksdto1.ISBN":"33003222219","booksdto1.publisher":"Tor Books Inc.","metadata.method":"authordto1"});

sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1.name":"The Shining","booksdto1.ISBN":"33003333319","booksdto1.publisher":"Penguin Inc.","metadata.method":"authordto1"});

sequenceObjList.push({"seq":"seq101","command.action":"get","wid":"mary_jane1"});


sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"compositeauthordto","first":"string","last":"string","age":"string","booksdto1":"onetomany","booksdto1.name":"string","booksdto1.ISBN":"string","booksdto1.publisher":"string","metadata.method":"compositeauthordto"});

sequenceObjList.push({"seq":"seq101","command.action":"add","wid":"mary_jane1","first":"Mary","last":"Sue","age":"30","booksdto1.name":"Time and Terror","booksdto1.ISBN":"10003458419","booksdto1.publisher":"Mega Books Inc.","metadata.method":"compositeauthordto"});

sequenceObjList.push({"seq":"seq101","command.action":"get","wid":"mary_jane1"});

sequenceObjList.push({"seq":"seq101","command.action":"get","wid":"mary_jane1", "command.dtotype":"compositeauthordto"});

sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"additionalinfoDTO","metadata.method":"additionalinfoDTO","actionDTO":"onetomany","paletteDTO":"onetomany"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"paletteDTO","metadata.method":"paletteDTO","widname":"string","category":"string","subcategory":"string"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"actionDTO","metadata.method":"actionDTO","actionname":"string"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"onlyactionDTO","metadata.method":"additionalinfoDTO","actionDTO":"onetomany"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"defaultactions","command.dtotype":"onlyactionDTO","metadata.method":"actionDTO","actionDTO.1.actionname":"new","actionDTO.2.actionname":"load","actionDTO.3.actionname":"save"});

sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"startwid","command.dtotype":"additionalinfoDTO", "paletteDTO.1.wid":"startwid1", "paletteDTO.1.widname":"wid1", "paletteDTO.1.category":"left", "paletteDTO.1.subcategory":"right", "paletteDTO.2.wid":"startwid2", "paletteDTO.2.widname":"wid2", "paletteDTO.2.category":"left2", "paletteDTO.2.subcategory":"right2", "paletteDTO.3.wid":"startwid3", "paletteDTO.3.widname":"wid3", "paletteDTO.3.category":"left3", "paletteDTO.3.subcategory":"right3", "actionDTO.1.wid":"startwidaction1","actionDTO.1.actionname":"new","actionDTO.2.wid":"startwidaction2","actionDTO.2.actionname":"load"});
sequenceObjList.push({"seq":"seq1","command.action":"get","wid":"startwid","command.dtotype":"additionalinfoDTO"});

sequenceObjList.push({"seq":"seq1","command.action":"get","wid":"startwid","inherit":"defaultactions","command.dtotype":"onlyactionDTO"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"onlypaletteDTO","metadata.method":"additionalinfoDTO","paletteDTO":"onetomany"});
sequenceObjList.push({"seq":"seq1","command.action":"get","wid":"startwid","command.dtotype":"onlypaletteDTO"});

sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsobject","metadata.method":"gojsobject","class":"string","linkFromPortIdProperty":"string","linkToPortIdProperty":"string","nodeDataArray":"onetomany","linkDataArray":"onetomany"});
sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"nodeDataArray","metadata.method":"nodeDataArray", "key":"string", "loc":"string", "leftArray":"onetomany", "topArray":"onetomany", "bottomArray":"onetomany", "rightArray":"onetomany"});
sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"leftArray","metadata.method":"leftArray","portColor":"string", "portId":"string"});
sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"topArray","metadata.method":"topArray","portColor":"string", "portId":"string"});
sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"bottomArray","metadata.method":"bottomArray","portColor":"string", "portId":"string"});
sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"rightArray","metadata.method":"rightArray","portColor":"string", "portId":"string"});
sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"linkDataArray","metadata.method":"linkDataArray", "from":"string", "to":"string", "fromPort":"string", "toPort":"string"});
//sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"widtest","metadata.method":"gojsobject","class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray.0.key":"unit One","nodeDataArray.0.loc":"101 204","nodeDataArray.0.leftArray.0.portColor":"#425e5c","nodeDataArray.0.leftArray.0.portId":"left0","nodeDataArray.0.topArray.0.portColor":"#d488a2","nodeDataArray.0.topArray.0.portId":"top0","nodeDataArray.0.bottomArray.0.portColor":"#316571","nodeDataArray.0.bottomArray.0.portId":"bottom0","nodeDataArray.0.rightArray.0.portColor":"#923951","nodeDataArray.0.rightArray.0.portId":"right0","nodeDataArray.0.rightArray.1.portColor":"#ef3768","nodeDataArray.0.rightArray.1.portId":"right1","nodeDataArray.1.key":"unit Two","nodeDataArray.1.loc":"320 152","nodeDataArray.1.leftArray.0.portColor":"#7d4bd6","nodeDataArray.1.leftArray.0.portId":"left0","nodeDataArray.1.leftArray.1.portColor":"#cc585c","nodeDataArray.1.leftArray.1.portId":"left1","nodeDataArray.1.leftArray.2.portColor":"#b1273a","nodeDataArray.1.leftArray.2.portId":"left2","nodeDataArray.1.topArray.0.portColor":"#14abef","nodeDataArray.1.topArray.0.portId":"top0","nodeDataArray.1.bottomArray.0.portColor":"#dd45c7","nodeDataArray.1.bottomArray.0.portId":"bottom0","nodeDataArray.1.bottomArray.1.portColor":"#995aa6","nodeDataArray.1.bottomArray.1.portId":"bottom1","nodeDataArray.1.bottomArray.2.portColor":"#6b95cb","nodeDataArray.1.bottomArray.2.portId":"bottom2","nodeDataArray.2.key":"unit Three","nodeDataArray.2.loc":"384 319","nodeDataArray.2.leftArray.0.portColor":"#bd8f27","nodeDataArray.2.leftArray.0.portId":"left0","nodeDataArray.2.leftArray.1.portColor":"#c14617","nodeDataArray.2.leftArray.1.portId":"left1","nodeDataArray.2.leftArray.2.portColor":"#47fa60","nodeDataArray.2.leftArray.2.portId":"left2","nodeDataArray.2.topArray.0.portColor":"#d08154","nodeDataArray.2.topArray.0.portId":"top0","nodeDataArray.2.bottomArray.0.portColor":"#6cafdb","nodeDataArray.2.bottomArray.0.portId":"bottom0","nodeDataArray.3.key":"unit Four","nodeDataArray.3.loc":"138 351","nodeDataArray.3.leftArray.0.portColor":"#491389","nodeDataArray.3.leftArray.0.portId":"left0","nodeDataArray.3.topArray.0.portColor":"#77ac1e","nodeDataArray.3.topArray.0.portId":"top0","nodeDataArray.3.bottomArray.0.portColor":"#e9701b","nodeDataArray.3.bottomArray.0.portId":"bottom0","nodeDataArray.3.rightArray.0.portColor":"#24d05e","nodeDataArray.3.rightArray.0.portId":"right0","nodeDataArray.3.rightArray.1.portColor":"#cfabaa","nodeDataArray.3.rightArray.1.portId":"right1","linkDataArray.0.from":"unit Four","linkDataArray.0.to":"unit One","linkDataArray.0.fromPort":"top0","linkDataArray.0.toPort":"bottom0","linkDataArray.1.from":"unit Four","linkDataArray.1.to":"unit Two","linkDataArray.1.fromPort":"top0","linkDataArray.1.toPort":"bottom0","linkDataArray.2.from":"unit Three","linkDataArray.2.to":"unit Two","linkDataArray.2.fromPort":"top0","linkDataArray.2.toPort":"bottom1","linkDataArray.3.from":"unit Four","linkDataArray.3.to":"unit Three","linkDataArray.3.fromPort":"right0","linkDataArray.3.toPort":"left0","linkDataArray.4.from":"unit Four","linkDataArray.4.to":"unit Three","linkDataArray.4.fromPort":"right1","linkDataArray.4.toPort":"left2","linkDataArray.5.from":"unit One","linkDataArray.5.to":"unit Two","linkDataArray.5.fromPort":"right0","linkDataArray.5.toPort":"left1","linkDataArray.6.from":"unit One","linkDataArray.6.to":"unit Two","linkDataArray.6.fromPort":"right1","linkDataArray.6.toPort":"left2"});	
//sequenceObjList.push({"seq":"seq1","command.action":"get","wid":"widtest"});
//                                                       {"metadata.method":"gojsobject","wid":"widtest","class":"go.GraphLinksModel","linkfromportidproperty":"fromPort","linktoportidproperty":"toPort","nodedataarray.0.key":"unit Two","nodedataarray.0.loc":"320 152","nodedataarray.1.key":"unit Three","nodedataarray.1.loc":"384 319","nodedataarray.1.metadata.method":"nodedataarray","nodedataarray.1.wid":"3","nodedataarray.2.key":"unit Four","nodedataarray.2.loc":"138 351","nodedataarray.2.metadata.method":"nodedataarray","nodedataarray.2.wid":"5","nodedataarray.3.metadata.method":"nodedataarray","nodedataarray.3.wid":"7","linkdataarray.0.from":"unit Three","linkdataarray.0.to":"unit Two","linkdataarray.0.fromport":"top0","linkdataarray.0.toport":"bottom1","linkdataarray.0.metadata.method":"linkdataarray","linkdataarray.0.wid":"11","linkdataarray.1.from":"unit Four","linkdataarray.1.to":"unit Three","linkdataarray.1.fromport":"right0","linkdataarray.1.toport":"left0","linkdataarray.1.metadata.method":"linkdataarray","linkdataarray.1.wid":"13","linkdataarray.2.from":"unit Four","linkdataarray.2.to":"unit Three","linkdataarray.2.fromport":"right1","linkdataarray.2.toport":"left2","linkdataarray.2.metadata.method":"linkdataarray","linkdataarray.2.wid":"15","linkdataarray.3.from":"unit One","linkdataarray.3.to":"unit Two","linkdataarray.3.fromport":"right0","linkdataarray.3.toport":"left1","linkdataarray.3.metadata.method":"linkdataarray","linkdataarray.3.wid":"17","linkdataarray.4.from":"unit One","linkdataarray.4.to":"unit Two","linkdataarray.4.fromport":"right1","linkdataarray.4.toport":"left2","linkdataarray.4.metadata.method":"linkdataarray","linkdataarray.4.wid":"19","linkdataarray.5.metadata.method":"linkdataarray","linkdataarray.5.wid":"21","linkdataarray.6.from":"unit Four","linkdataarray.6.to":"unit Two","linkdataarray.6.fromport":"top0","linkdataarray.6.toport":"bottom0","linkdataarray.6.metadata.method":"linkdataarray","linkdataarray.6.wid":"9"}
	/*
	sequenceObjList.push({"seq":"seq001", "command.action":"add", "wid":"wid1", "metadata.method":"widdto", "companyname":"Zerox", "address":"1500 Pennsylvania Ave.", "security":"50", "c":"blue"});
	sequenceObjList.push({"seq":"seq002","command.action":"add","wid":"schools0002","name":"string","address":"string"});
	sequenceObjList.push({"seq":"seq003","command.action":"add","command.dtotype":"schools0002","wid":"exampleSchool0001","name":"NMC","address":"1000 E. Front St."});
	sequenceObjList.push({"seq":"seq004","command.action":"add","command.dtotype":"schools0002","name":"NMC","address":"1000 E. Front St."});
	sequenceObjList.push({"seq":"seq005","command.action":"add","method.metadata":"schools0002","name":"NMC","address":"1000 E. Front St.","size":"<10,000"});
	sequenceObjList.push({"seq":"seq006","command.action":"add","wid":"departmentsdto001","name":"string","classes":"string"});
	sequenceObjList.push({"seq":"seq007","command.action":"add","wid":"schoolsdto001","name":"string","departmentsdto001":"onetomany","departmentsdto001.name":"string"});
	sequenceObjList.push({"seq":"seq008","command.action":"add","wid":"schoolsdto002","name1":"string","departmentsdto001":"onetomany","departmentsdto001.name":"string"});
	sequenceObjList.push({"seq":"seq009","command.action":"add","metadata.method":"schoolsdto001","name":"NMC","departmentsdto001.name":"Biology"});
	sequenceObjList.push({"seq":"seq010","command.action":"add","command.dtotype":"schoolsdto001","name":"NMC","departmentsdto001.name":"Biology"});
	sequenceObjList.push({"seq":"seq011","command.action":"add","command.dtotype":"schoolsdto001","metadata.method":"schoolsdto002","name":"NMC","departmentsdto001.name":"Biology"});
	
	sequenceObjList.push({"seq":"seq012","command.action":"add","wid":"notesdto001","comments":"string"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"workersdto001","first":"string","last":"string","employment":"string","yearsatcompany":"string","position":"string","notesdto001":"onetomany","notesdto001.comments":"string"});
	sequenceObjList.push({"seq":"seq014","command.action":"add","wid":"companydto001","name":"string","address":"string","city":"string","state":"string","country":"string","phone":"string","workersdto001":"onetomany","workersdto001.first":"string","workersdto001.last":"string","workersdto001.employment":"string","workersdto001.yearsatcompany":"string","workersdto001.position":"string","workersdto001.notesdto001":"onetomany","wokersdto001.notesdto001.comments":"string"});
	sequenceObjList.push({"seq":"seq015","command.action":"add","command.dtotype":"companydto001","name":"Best Buy","address":"2550 US 31","city":"Traverse City","state":"MI","country":"US","phone":"2315555555","workersdto001.first":"Joe","workersdto001.last":"Schmoe","workersdto001.employment":"full time","workersdto001.yearsatcompany":"9","workersdto001.position":"helpdesk","wokersdto001.notesdto001.comments":"easy to get along with"});
	//sequenceObjList.push({"command.action":"add","wid":"schools0002","name":"string","address":"string"});
	//sequenceObjList.push({"command.action":"add","wid":"schools0002","name":"string","address":"string"});
	*/

/*
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"foodmasterdto", "categories":"string", "fooddto":"onetomany","fooddto.restaurant":"string","fooddto.food":"string" });
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"fooddto", "metadata.method":"fooddto"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"compositedto", "metadata.method":"compositedto", "categories":"string", "fooddto.restaurant":"string", "fooddto.food":"string", "fooddto":"onetomany"});

	sequenceObjList.push({"seq":seq,"command.action":"add","metadata.method":"fooddto", "categories":"food", "wid":"wid51", "fooddto.restaurant":"first","fooddto.food":"test2"});
	sequenceObjList.push({"seq":seq,"command.action":"add","metadata.method":"fooddto", "categories":"food", "wid":"wid52", "fooddto.restaurant":"first","fooddto.food":"test2"});
	sequenceObjList.push({"seq":seq,"command.action":"add","metadata.method":"fooddto", "categories":"food", "wid":"wid53", "fooddto.restaurant":"first","fooddto.food":"test2"});
	sequenceObjList.push({"seq":seq,"command.action":"add","metadata.method":"fooddto", "categories":"food", "wid":"wid54", "fooddto.restaurant":"first","fooddto.food":"test2"});
	sequenceObjList.push({"seq":seq,"command.action":"add","metadata.method":"fooddto", "categories":"food", "wid":"wid55", "fooddto.restaurant":"first","fooddto.food":"test2"});
	
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid61", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid51", "relationshiptrype":"attributes", });
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid62", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid52", "relationshiptrype":"attributes"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid63", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid53", "relationshiptrype":"attributes"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid64", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid54", "relationshiptrype":"attributes"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid65", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid55", "relationshiptrype":"attributes"});
*/
/*
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"foodmasterdto", "metadata.method":"foodmasterdto"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"fooddto", "metadata.method":"fooddto"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"relationshipdto", "metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid":"compositedto", "fooddto":"onetomany","metadata.method":"compositedto", "categories":"string", "fooddto.restaurant":"string", "fooddto.food":"string", "command.dtotype":"compositedto"});
	
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid50", "metadata.method":"compositedto","categories": "food"});
	
	sequenceObjList.push({"seq":seq,"wid": "wid50","command.action":"add", "metadata.method":"compositedto","fooddto.restaurant": "asian", "fooddto.food": "sushi", "command.dtotype":"compositedto"});
	sequenceObjList.push({"seq":seq,"wid": "wid50","command.action":"add", "metadata.method":"compositedto","fooddto.restaurant": "asian", "fooddto.food": "sushi", "command.dtotype":"compositedto"});
	sequenceObjList.push({"seq":seq,"wid": "wid50","command.action":"add", "metadata.method":"compositedto","fooddto.restaurant": "mexican", "fooddto.food": "taco", "command.dtotype":"compositedto"});
	sequenceObjList.push({"seq":seq,"wid": "wid50","command.action":"add", "metadata.method":"compositedto","fooddto.restaurant": "asian", "fooddto.food": "sushi", "command.dtotype":"compositedto"});
	sequenceObjList.push({"seq":seq,"wid": "wid50","command.action":"add", "metadata.method":"compositedto","fooddto.restaurant": "asian", "fooddto.food": "sushi", "command.dtotype":"compositedto"});
*/
	/*
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid61", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid51", "relationshiptrype":"attributes"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid62", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid52", "relationshiptrype":"attributes"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid63", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid53", "relationshiptrype":"attributes"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid64", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid54", "relationshiptrype":"attributes"});
	sequenceObjList.push({"seq":seq,"command.action":"add","wid": "wid65", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid55", "relationshiptrype":"attributes"});
	*/



// SEQ450
// Create class description of author by creating authordto1
sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany"});
// Create class description of book by creating bookdto1
sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});
// Create the relationship between the author and the book
sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
// Create the 1st of 3 books
sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc.","metadata.method":"authordto1"});

sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"mary_jane1","first":"BMary","last":"BSue","age":"3B0","booksdto1.name":"BPawn Of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc.","metadata.method":"authordto1"});

sequenceObjList.push({"seq":"seq450","command.action":"add","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30","booksdto1.name":"CThe Shining","booksdto1.ISBN":"C33003333319","booksdto1.publisher":"CPenguin Inc.","metadata.method":"authordto1"});
/*
	Used in the AddWidObject window for seq450
		<textarea rows="5" cols="100" id="addwidobjectparameters">{"wid":"mary_jane1","booksdto1.name":"DWrinkle In Time","booksdto1.ISBN":"D33004444419","booksdto1.publisher":"DPenguin Inc.","metadata.method":"authordto1"}</textarea>

		<textarea rows="5" cols="100" id="addwidobjectparameters">{"wid":"mary_jane1","booksdto1.name":"DWrinkle In Time","booksdto1.ISBN":"D33004444419","booksdto1.publisher":"DPenguin Inc."}</textarea>
			
			Test addwid without 	metadata.method adds the book as fields of the author ** not so good
			Test addwid with 		metadata.method adds book associated with author ** correct

*/





	// SEQ460
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq460","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany"});
	// Create class description of book by creating bookdto1
	sequenceObjList.push({"seq":"seq460","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});
	// Create the relationship between the author and the book
	sequenceObjList.push({"seq":"seq460","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	// Create the author
	sequenceObjList.push({"seq":"seq460","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30"});
	// Create a book without a metadata.method, but WITH a command.dtotype
	sequenceObjList.push({"seq":"seq460","command.action":"add","command.dtotype":"authordto1","wid":"mary_jane1","booksdto1.name":"BPawn Of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc."});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq460","command.action":"get","wid":"mary_jane1"});


	/*   **** This test fails...the book data is added to the authordto
					Test addwid without 	command.dtotype 
					Test addwid with 		command.dtotype 
	*/

	// SEQ470 To test the add wid with command.dtotype and without
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq470","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany"});
	// Create class description of book by creating bookdto1
	sequenceObjList.push({"seq":"seq470","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});
	// Create the relationship between the author and the book
	sequenceObjList.push({"seq":"seq470","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	// Create the author without a command.dtotype
	sequenceObjList.push({"seq":"seq470","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30"});
	// Create a book with a command.dtotype
	sequenceObjList.push({"seq":"seq470","command.action":"add","command.dtotype":"booksdto1","name":"BPawn Of Prophecy","ISBN":"B33003222219","publisher":"BTor Books Inc."});
	/*   **** This test passes...	the author is created without a command.dttotype and is created (regardless of what an author acturally is intended to be)
									the book is added using the command.dtotype of booksdto1 and creates the book as it should. It does not create a relationship between the two.
					Test addwid without 	command.dtotype 
					Test addwid with 		command.dtotype 
	*/

	// SEQ480 To test the add wid where the wid is created with authordto1, but appended with phonedto1
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq480","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	// Create the phonedto
	sequenceObjList.push({"seq":"seq480","command.action":"add","wid":"phonedto1","cell":"string","work":"string","home":"string","metadata.method":"phontdto1"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq480","command.action":"add","wid":"mary_jane1","metadata.method":"authordto1","first":"AMary","last":"AJane","age":"A30"});
	// Add data to the author with the phonedto1
	sequenceObjList.push({"seq":"seq480","command.action":"add","wid":"mary_jane1","command.dtotype":"phonedto1","cell":"111-111-1111"});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq480","command.action":"get","wid":"mary_jane1"});
	// Verify the get call for mary_jane1
	sequenceObjList.push({"seq":"seq480","command.action":"verify","verifywid":"get_mary_jane1","wid":"mary_jane1","metadata.method":"phonedto1","cell":"111-111-1111","first":"AMary","last":"ASue","age":"A30","LOG":"LOG"});
	/* This test fails. It does not add the cell phone data to the author, although you would want it to. */


	// SEQ440 To test the add wid and verify success
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq440","command.action":"get","wid":"mary_jane1", "command.dtotype":"authordto"});
	// Verify the get call for mary_jane1
	//sequenceObjList.push({"seq":"seq440","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"author_dto","thisfield":"isextra","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1","LOG":"LOG"});
	sequenceObjList.push({"seq":"seq440","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"author_dto","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});

	// SEQ490 To test an object with 2 children, where those children have children(grandchildren) and one of those
	// grandchildren has a one to one child relationship 
	// Clear the db
	sequenceObjList.push({"seq":"seq490","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany","addressdto1":"onetomany"});
	//Create a child class description of book by creating bookdto1
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1","coverdto1":"onetomany"});
	// Create a grandchild class description of cover by creating coverdto1
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"coverdto1","color":"string","metadata.method":"coverdto1"});
	// Create class description of address by creating addressdto1
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"addressdto1","address":"string","city":"string","state":"string","metadata.method":"addressdto1","customercodedto1":"onetoone"});
	// Create class description of a unique customercode by creating cusomtercodedto1
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"customercodedto1","code":"string"});

	// Relationships
	// Create the relationship between the author and the book
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	// Create the relationship between the author and the book
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"rel2","primarywid":"authordto1","secondarywid":"addressdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	// Create the relationship between the author and the book
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"rel3","primarywid":"booksdto1","secondarywid":"coverdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	// Create the relationship between the author and the book
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"rel4","primarywid":"addressdto1","secondarywid":"customercodedto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});


	// Create the author
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"l_hubbard","first":"lafayette","last":"hubbard","age":"75","metadata.method":"authordto1"});
	// Add some data to hubbard, like a new book
	sequenceObjList.push({"seq":"seq490","command.action":"add","wid":"l_hubbard","booksdto1.name":"Scientology Rules","booksdto1.ISBN":"A10006666419","booksdto1.publisher":"Loony Books Inc.","metadata.method":"authordto1"});
	


	// Generate a new get call for L Hubbard to see if the book takes
	sequenceObjList.push({"seq":"seq490","command.action":"get","wid":"l_hubbard","command.dtotype":"authordto1"});



	testSequeceObjList(sequenceObjList, seqList);
}

function testAddTestingWids(){
	var testWids = [];
	/*
	testWids.push({'wid':'wid100','a.x': 'y', 'c': 'd', 'e': 'f', 'g.w': 'h', 'g.t': 'y', 'time':'2013-09-08T04:00:51.971Z', 'companyname': 'abc', 'address': '1000 any', 'security':'2', 'c':'d'});
	testWids.push({'wid':'wid200', 'w': 'x', 'z': 'q', 't': 'y', 'time':'2013-09-08T04:00:51.971Z', 'companyname': 'abc', 'address': '1000 any', 'security':'1', 'c':'d'});
	testWids.push({'wid':'wid300', 'metaddata.method':'testdto', 'h': 'j', 'k': 'l', 'm': 'n', 'time':'2013-09-08T04:00:51.971Z', 'companyname': 'abc', 'address': '1000 any', 'security':'2', 'c':'d'});
	testWids.push({'wid': 'wid400', 'wid100' : '', 'wid200': '', 'wid300': '', 'time':'2013-09-08T04:00:51.971Z', 'companyname': 'abc', 'address': '1000 any', 'security':'1', 'c':'d'});
	testWids.push({'wid': 'wid1', 'metadata.method':'widdto', 'companyname': 'Zerox', 'address': '1500 Pennsylvania Ave.', 'security':'50', 'c':'blue'});
	testWids.push({'wid': 'widdto',  'testdto.h' :'string', 'metadata.method':'widdto', 'companyname': 'string', 'testdto': 'onetomany', 'address': 'string', 'security':'string', 'c':'string'});
    testWids.push({'wid': 'testdto', 'metaddata.method':'testdto', 'h': 'string'});
    testWids.push({'wid': 'wid3', 'primarywid': 'wid1', 'secondarywid':'wid300'});
    testWids.push({'wid': 'wid4', 'primarywid': 'widdto', 'secondarywid':'testdto'});
    testWids.push({'wid': 'schooldto', 'metadata.method': 'schooldto', 'schoolname': 'string', 'country': 'string' });
    testWids.push({'wid': 'teacherdto', 'metadata.method': 'teacherdto', 'teachername': 'string'});
    testWids.push({'wid': 'teachertypedto', 'metadata.method': 'teachertypedto', 'degree': 'string'});
    testWids.push({'wid': 'studentdto', 'metadata.method': 'studentdto', 'studentname': 'string', 'country': 'string'});
    testWids.push({'wid': 'compositeschooldto', 'metadata.method': 'compositschooldto', 'schoolname': 'string', 'county': 'string', 'teacherdto.teacherdegreedto': 'onetoone', 'teacherdto.studentdto': 'onetomany', 'teacherdto': 'onetomany', 'teacherTypedto': 'onetoone', 'teacherdto.teachername': 'string', 'teacherdto.degree': 'string', 'teacherdto.strudentdto.studentname': 'string', 'teacherdto.studentdto.country': 'string'});
    testWids.push({'wid': 'compositeteacherdto', 'metadata.method': 'compositeteacherdto', 'teachername': 'string', 'degree': 'string', 'studentdto.studentname': 'string', 'studentdto.country': 'string', 'studentdto': 'onetomany'});
    testWids.push({'wid': 'teacherbob', 'teachername': 'bob', 'metadata.method': 'teacherdto'});
    testWids.push({'wid': 'studenttom', 'studentname': 'tom', 'metadata.method': 'studentdto'});
    testWids.push({'wid': 'xyz', 'primarywid': 'teacherbob', 'secondarywid': 'studenttom', 'relationshiptype': 'attributes'});
    testWids.push({'wid':'wid100','a':'string','b':'string'});
    testWids.push({'wid':'wid101','a':'onetomany'});
    testWids.push({'wid':'wid103', 'a.x': 'string', 'c': 'string', 'e': 'string', 'g.w': 'string', 'g.t': 'string', 'a': 'onetomany', 'g': 'onetomany' });
	*/
	// testWids.push({"wid":"foodmasterdto", "metadata.method":"foodmasterdto"});
	// testWids.push({"wid":"fooddto", "metadata.method":"fooddto"});
	// testWids.push({"wid":"relationshipdto", "metadata.method":"relationshipdto"});
	// testWids.push({"wid":"compositedto", "metadata.method":"compositedto", "categories":"string", "fooddto.restaurant":"string", "fooddto.food":"string", "fooddto":"onetomany", "command.dtotype":"compositedto"});
	
	// testWids.push({"wid": "wid50", "metadata.method":"compositedto","categories": "food"});
	
	// testWids.push({"wid": "wid51", "metadata.method":"fooddto","restaurant": "asian", "food": "sushi"});
	// testWids.push({"wid": "wid52", "metadata.method":"fooddto","restaurant": "asian", "food": "sushi"});
	// testWids.push({"wid": "wid53", "metadata.method":"fooddto","restaurant": "mexican", "food": "taco"});
	// testWids.push({"wid": "wid54", "metadata.method":"fooddto","restaurant": "asian", "food": "sushi"});
	// testWids.push({"wid": "wid55", "metadata.method":"fooddto","restaurant": "asian", "food": "sushi"});

	/*
	testWids.push({"wid": "wid61", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid51", "relationshiptrype":"attributes"});
	testWids.push({"wid": "wid62", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid52", "relationshiptrype":"attributes"});
	testWids.push({"wid": "wid63", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid53", "relationshiptrype":"attributes"});
	testWids.push({"wid": "wid64", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid54", "relationshiptrype":"attributes"});
	testWids.push({"wid": "wid65", "metadata.method":"relationshipdto", "primarywid": "wid50", "secondarywid": "wid55", "relationshiptrype":"attributes"});
	*/

	for(key in testWids){
		var widObj = testWids[key];
		
		//LocalStorage: Add Wid
		addToLocalStorage(widMasterKey+widObj["wid"], widObj); 
	}
}

//var seq="seq10";


// function testSimpleAddGetWids(){
// 	var sequenceObjList =[];
// 	//Add
// 	// sequenceObjList.push({"seq":seq,"command.action":"add","wid":"fooddto", "metadata.method":"fooddto","restaurant":"string"});
// 	// sequenceObjList.push({"seq":seq,"command.action":"add","wid":"wid50","metadata.method":"fooddto","restaurant": "abc rest"});
// 	// //Get
// 	// sequenceObjList.push({"seq":seq,"command.action":"get","wid":"wid50", "command.dtotype":"fooddto", "command.inherit":"inherit", "command.convertmethod":"", "command.accesstoken":"accesstoken"});
// 	// //Verify	
// 	// sequenceObjList.push({"seq":seq,"command.action":"verify","wid":"wid50","verifywid":"wid50","restaurant":"abc rest","metadata.method":"metadatamethod"});
// 	testSequeceObjList(sequenceObjList, seqList);
// }
// //function testAddWids(data_set){

// function testProcessBrackets(){
// 	var parameterobject = {'restaurant': 'mexican', 'food': 'taco'};
// 	var parentwid = 'wid50';
// 	var dtoobject = getFromMongo({'wid':'foodmasterdto'});
// 	var dtoList = objectToList(dtoobject);
// 	var dtotypeindex = 'foodmasterdto<2>';
	
// 	var output = ProcessBrackets(parameterobject, dtoList, parentwid, dtotypeindex);
// 	printToDiv('Function testProcessBrackets() output : ',  output);
// }


// {"command.dtotype": "compositeteacherdto", "teachername": "roger", "degree": "basketweaving", "studentdto.studentname": "Joe", "studentdto.country": "Thailand"}
//{"wid":"studentmoe", "studentname": "moe"} 
//var input = { 'a.x': 'y', 'c': 'd', 'e': 'f', 'g.w': 'h', 'g.t': 'y', 'command.dtotype': 'dtoX', 'command.checkdatatypeflag': "dto" };
// { "a.x": "y", "c": "d", "e": "f", "g.w": "h", "g.t": "y", "command.dtotype": "wid103", "command.checkdatatypeflag": "dto" }
//var dtoobjectDOT = { 'a.x': 'string', 'c': 'string', 'e': 'attributes', 'g.w': 'string', 'g.t': 'string', 'a': 'attribute', 'g': 'attribute' };
//var input = {'h':'t','g':'r','f':'e','t':'qqq','t.a':'f','t.e':'j','t.c':'ddd','t.b':'aaa','t.d':'i','t.b.m':'g','t.b.z':'ccc','t.b.d':'c ','t.b.q':'r','t.c.t':'w','t.c.l':'q','t.c.z':'j','t.b.z.r':'s','t.b.z.t':'v','t.b.z.y':'bbb','t.b.z.x':'y','t.b.z.y.u':'j','t.b.z.y.s':'h','t.b.z.y.a':'i'};
//var dtoobjectDOT = {'h':'string','g':'string','f':'string','t':"json",'t.a':'string','t.e':'string','t.c':'attribute','t.b':'attribute','t.d':'string','t.b.m':'string','t.b.z':'attribute','t.b.d':'string','t.b.q':'string','t.c.t':'string','t.c.l':'string','t.c.z':'string','t.b.z.r':'string','t.b.z.t':'string','t.b.z.y':'attribute','t.b.z.x':'string','t.b.z.y.u':'string','t.b.z.y.s':'string','t.b.z.y.a':'string'};
//{'h':'t','g':'r','f':'e','t':'qqq','t.a':'f','t.e':'j','t.c':'ddd','t.b':'i','t.b.m':'g','t.b.z':'ccc','t.b.d':'c ','t.b.q':'r','t.c.t':'w','t.c.l':'q','t.c.z':'j','t.b.z.r':'s','t.b.z.t':'v','t.b.z.y':'bbb','t.b.z.x':'y','t.b.z.y.u':'j','t.b.z.y.s':'h','t.b.z.y.a':'i'}
//{'h':'string','g':'string','f':'string','t':"json",'t.a':'string','t.e':'string','t.c':'attribute','t.b':'string','t.b.m':'string','t.b.z':'attribute','t.b.d':'string','t.b.q':'string','t.c.t':'string','t.c.l':'string','t.c.z':'string','t.b.z.r':'string','t.b.z.t':'string','t.b.z.y':'attribute','t.b.z.x':'string','t.b.z.y.u':'string','t.b.z.y.s':'string','t.b.z.y.a':'string'}
//var input = { 'a':'b'};
//var dtoobjectDOT = {'a':'attribute'};
//var input = { 'a':'b','c':'d'};
//var dtoobjectDOT = {'a':'attribute','c':'string'};
//var dtoXobjectDOT = { 'a.x': 'string', 'c': 'string', 'e': 'string', 'g.w': 'string', 'g.t': 'string' };
//var dtoobjectDOT = {'userdto':'attribute','name':'string', 'address': 'string', 'country':'string', 'state':'string', 'userdto.name':'string','userdto.address':'string','userdto.country':'string', 'userdto.state':'string', 'userdto.userclass':'string'};
//var input = {'name':'Magnolia','address':'125 w 57th st.','country':'US','state':'NY','userdto.name':'cody','userdto.address':'55 Clark St.','userdto.country':'US','userdto.state':'NY','userdto.userclass':'student'};

//var dtoobjectDOT = {'name':'string','address':'string','city':'string','state':'string','country':'string','phone':'string','workersdto':'attribute','workersdto.first':'string','workersdto.last':'string','workersdto.employment':'string','workersdto.yearsatcompany':'string','workersdto.position':'string','workersdto.notes':'attribute','workersdto.notes.comments':'string'};
//var input = {'name':'Happy Stuff Inc.','address':'123 Henry St.','city':'Brooklyn','state':'NY','country':'US','phone':'555-555-5555','workersdto.first':'George','workersdto.last':'Carver','workersdto.employment':'full time','workersdto.yearsatcompany':'9','workersdto.position':'cashier','workersdto.notes.comments':'up for promotion'};

//var dtoobjectDOT = {'name':'string','type':'string','categorydto':'attribute','categorydto.category':'string','categorydto.productsdto':'attribute','categorydto.productsdto.name':'string','categorydto.productsdto.price':'string','categorydto.productsdto.manufacturerdto':'attribute','categorydto.productsdto.manufacturerdto.name':'string'};
//var input = {'name':'Bread Shop','type':'Bakery','categorydto.category':'Breads','categorydto.productsdto.name':'French Baguette','categorydto.productsdto.price':'$4.99','categorydto.productsdto.manufacturerdto.name':'Bay Bread'};

//var dtoobjectDOT = {'one':'string','bdto':'attribute','bdto.two':'string','cdto':'attribute','cdto.three':'string','ddto':'attribute','ddto.four':'string','edto':'attribute','edto.five':'string'};
//var input = {'one':'first wid','bdto.two':'second wid','cdto.three':'third wid','ddto.four':'fourth wid','edto.five':'fifth wid'};

//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string'};
//var input = {'name':'NMC','address':'1000 W Front St.','phone':'231-995-1000','size':'small','departmentsdto.name':'Programming','departmentsdto.supervisor':'Keith Kelly','departmentsdto.totalstaff':'30','departmentsdto.size':'medium'};

//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string'};
//var input = {'address':'1000 W Front St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Keith Kelly','departmentsdto.totalstaff':'30'};

//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string'};
//var input = {};

//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string','departmentsdto.classesdto':'attribute','departmentsdto.classesdto.name':'string','departmentsdto.classesdto.size':'string'};
//var input = {'name':'NMC','address':'1000 W Front St.','departmentsdto.classesdto.name':'Programming 101','departmentsdto.classesdto.size':'30'};

//var dtoobjectDOT = {'name':'string','address':'string','schooldto':'attribute','schooldto.name':'string','schooldto.address':'string','schooldto.schooldto':'attribute','schooldto.schooldto.name':'string','schooldto.schooldto.address':'string'};
//var input = {'name':'NMC','address':'1000 W Front St.','schooldto.name':'NMC','schooldto.address':'1000 W Front St.','schooldto.schooldto.name':'NMC','schooldto.schooldto.address':'1000 W Front St.'};

//var dtoobjectDOT = {'departmentsdto':'attribute','name':'string','address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'};
//var input = {'departmentsdto':'attribute','name':'NMC','address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'};

//var dtoobjectDOT = {'departmentsdto':'attribute','?name':'string','?address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'}
//var input = {'?name':'NMC','?address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}

//var dtoobjectDOT = {'departmentsdto':'attribute','"name':'string','"address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'}
//var input = {'"name':'NMC','"address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}

//var dtoobjectDOT = {'departmentsdto':'attribute','\name':'string','\address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'}
//var input = {'\name':'NMC','\address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}

//var dtoobjectDOT = {'departmentsdto':'attribute','\college':'string','\address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'}
//var input = {'\college':'NMC','\address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}

// function addSeq(){
// 	sequenceObjList =[];
// 	sequenceObjList.push({"seq":"seq010","command.action":"add","wid":"author_dto","name":"string","book_dto":"onetomany","book_dto.title":"string","book_dto.price":"string"});
// 	sequenceObjList.push({"seq":"seq010","command.action":"add","wid":"mary_jane1","command.dtotype":"author_dto","name":"Mary Jane","book_dto.title":"Into the Blue","book_dto.price":"$16.99"});
	
// 	testSequeceObjList(sequenceObjList);
// }

// function addAll(){	
// 	testWids.push({'wid':'wid100','a.x': 'y', 'c': 'd', 'e': 'f', 'g.w': 'h', 'g.t': 'y', 'time':'2013-09-08T04:00:51.971Z', 'companyname': 'abc', 'address': '1000 any', 'security':'2', 'c':'d'});
// 	testWids.push({'wid':'wid200', 'w': 'x', 'z': 'q', 't': 'y', 'time':'2013-09-08T04:00:51.971Z', 'companyname': 'abc', 'address': '1000 any', 'security':'1', 'c':'d'});
	
// 	for(key in testWids){
// 		var widObj = testWids[key];
		
// 		//LocalStorage: Add Wid
// 		addToLocalStorage(widMasterKey+widObj["wid"], widObj); 
// 	}
// }

// function testRelationshipAddGetWids(){
// 	var sequenceObjList =[];
// 	//Add
// 	// sequenceObjList.push({"seq":seq,"command.action":"add","wid":"compositedto", "fooddto":"onetomany","metadata.method":"compositedto", "categories":"string", "fooddto.restaurant":"string", "fooddto.food":"string", "command.dtotype":"compositedto"});
// 	// sequenceObjList.push({"seq":seq,"command.action":"add","wid":"wid51","metadata.method":"compositedto","fooddto.restaurant": "abc rest", "categories":"testcat"});
// 	//Get
// 	//sequenceObjList.push({"seq":seq, "command.action":"get", "wid":"wid51", "command.dtotype":"compostiteDTO", "command.inherit":"inherit", "command.convertmethod":"", "command.accesstoken":"accesstoken"});
// 	testSequeceObjList(sequenceObjList);
// }