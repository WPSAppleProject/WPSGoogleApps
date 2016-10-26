// Code adapted from this excellent gist: https://gist.github.com/bmcbride/62600e48274961819084
// Generate GitHub Access Token with repo access

var ghToken = "<replace with token>";

function onFormSubmit(e) {

  // Attach script to Google Form and get last response submitted
  
  var response = e.response;
  var itemResponses = response.getItemResponses();
  
  // Seems to drop out the TimeStamp response - creation on GitHub Issue with give a time/date
  var item0 = itemResponses[0].getResponse();  // Issue label
  var item1 = itemResponses[1].getResponse();  // Name
  var item2 = itemResponses[2].getResponse();  // Room
  var item3 = itemResponses[3].getResponse();  // Grade
  var item4 = itemResponses[4].getResponse();  // Email
  var item5 = itemResponses[5].getResponse();  // Description

  // Build title for Issue
  
  var title = item1 + " - " + item2 + ": " + item0;

  //Build body - markdown can be used
  
  var body = item1 +"\n" +
    item2 + " Grade: " + item3 + "\n" +
    item4 + "\n" + 
    "\n" +
    "------ \n" + 
    item5 + "\n";
      
  //Payload for URL POST - labels must be an Array
  var payload = {
    "title": title,
    "body": body,
    "labels" : [ item0 ]
  };

  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  //Create URL with repo name in path 
  var response = UrlFetchApp.fetch("https://api.github.com/repos/WPSAppleProject/WoodlandCED/issues?access_token="+ghToken, options);
}
