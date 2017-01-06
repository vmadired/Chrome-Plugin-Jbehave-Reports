



document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('link');
	var main = document.getElementById('main');
    // onClick's logic below:
    link.addEventListener('click', function() {
      /*  chrome.tabs.getSelected(null, function(tab) {
        var tabID = tab.id;
        tabUrl = tab.url;

        alert(tab.url);
    }); */
	
	chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('path')[0].textContent;"}, function (e) {
			document.getElementById('summary').value = e;
            console.log(e);
           //document.getElementById('summary').value="Automation Story: " + e;
        }); 
		
		/*chrome.tabs.executeScript( tab.id, {code:"document.getElementById('hmenus')"},
			function(results){ console.log(results); } ); */
       

    });
	
	
	
	chrome.tabs.getSelected(null, function (tab) {
		var i=document.getElementById('scenario').value;
		console.log("document.getElementsByClassName('scenario')["+i+"].textContent");
        chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('scenario')["+i+"].textContent;"}, function (e) {
            console.log(e);
         console.log(i); 
        }); 
		
		
       

    });
	
	
	
	


	
	
    });			//  link.add event ka hai yeh 
});   //document.add event ka hai yeh 


