document.addEventListener('DOMContentLoaded', function () {

    var link = document.getElementById('populate_data');
    var open = document.getElementById('open_defect');

    var story_file_loc = "Story file path: ";
    // onClick's logic below:
    link.addEventListener('click', function () {

        if (window.frames['jira_frame'].contentDocument.getElementById('summary') == undefined)
            alert("Please go to create defect page first...");


        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.executeScript(tab.id, {code: "window.frames['iframe'].contentDocument.getElementsByClassName('path')[0].textContent;"}, function (e) {
                // chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('path')[0].textContent;"}, function (e) {
                story_file_loc += e[0];
                var tokens = e[0].split("/");
                window.frames['jira_frame'].contentDocument.getElementById('summary').value = "Automation Story Failed: " + tokens[tokens.length - 1];
            });

        });


        chrome.tabs.getSelected(null, function (tab) {
            var i = document.getElementById('scenario').value - 1;
            chrome.tabs.executeScript(tab.id, {code: "window.frames['iframe'].contentDocument.getElementsByClassName('scenario')[" + i + "].textContent;"}, function (e) {
                // chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('scenario')[" + i + "].textContent;"}, function (e) {
                window.frames['jira_frame'].contentDocument.getElementById('description').value = story_file_loc + "\n" + e;
            });

        });


    });

    open.addEventListener('click', function () {
        chrome.tabs.create({url: document.getElementById("jira_frame").contentWindow.location.href});

    });
});