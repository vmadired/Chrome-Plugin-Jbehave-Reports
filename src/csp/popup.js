function awesome() {
    // Do something awesome!
    //alert('awesome()');
}

function totallyAwesome() {
    // do something TOTALLY awesome!


    chrome.tabs.getSelected(null, function (tab) {
        //chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('path')[0].textContent;"}, function (e) {
        //    console.log(e);
        //    document.getElementById('summary').value="Automation Story: " + e;
        //});
        /*
        chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('scenario')[" + scenario + "].innerText;"}, function (e) {
            console.log(e);
            //$('#description').val(e);
        });


        chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('scenario')[" + scenario + "].getElementsByTagName('img')[0].src;"}, function (e) {
            localStorage.screenShotLocation = e;
        });
*/

    });


}

function awesomeTask() {
    awesome();
    totallyAwesome();
}

function clickHandler(e) {
    setTimeout(awesomeTask, 1000);
}

function main() {
    // Initialization work goes here.
    //$("#siteloader").html('<object data="https://system.netsuite.com/pages/customerlogin.jsp?country=US" />');
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', clickHandler);
    main();
});