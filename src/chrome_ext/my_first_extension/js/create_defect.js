document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('get_scenario').addEventListener('click', captureDefectDetails);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('create-issue-submit').addEventListener('click', createJiraIssue);
});

function captureDefectDetails() {

    var scenario = parseInt($('#scenario').val()) - 1;

    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('path')[0].textContent;"}, function (e) {
            $('#summary').val("Automation Story: " + e);
        });

        chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('scenario')[" + scenario + "].innerText;"}, function (e) {
            $('#description').val(e);
        });

        chrome.tabs.executeScript(tab.id, {code: "document.getElementsByClassName('scenario')[" + scenario + "].getElementsByTagName('img')[0].src;"}, function (e) {
            localStorage.screenShotLocation = e;
        });

    });
}

//chrome.browserAction.onClicked.addListner(captureDefectDetails());
function createDefect() {
    /* var components = "";

     for (var i = 0; i < 10; i++) {

     components + = {            name: i}

     myarray.push(item);
     }*/

    //var defect = {
    //    fields: {
    //        project: {
    //            key: $('#project')[0].title
    //        },
    //        summary: $('#summary').val(),
    //        /* components: [
    //         {
    //         name: Component 1
    //         },
    //         {
    //         name: Component 2
    //         }
    //         ],*/
    //        customfield_10111: {
    //            value: $('#customfield_10111').val()
    //        },
    //        description: $('#description').val(),
    //        issuetype: {
    //            name: 'Bug'
    //        }
    //    }
    //};

    var defect = {
        "fields": {
            "project": {
                "key": "$('#project')[0].title"
            },
            "summary": "$('#summary').val()",
            "components": [
                {
                    "name": "Component1"
                },
                {
                    "name": "Component2"
                }
            ],
            "customfield_10111": {
                "value": "$('#customfield_10111').val()"
            },
            "description": "$('#description').val()",
            "issuetype": {
                "name": "Bug"
            }
        }
    }


    //alert(">>> Before");

    //Json.parse(defect);

    //alert(">>> After");

    /* $.ajax({
     url: $('#jira_url').val()+'/rest/api/2/issue/',
     type: 'post',
     contentType: "application/json",
     async: true,
     success: function (data) {
     alert('Success: '+data.status);
     },
     error: function (data) {
     alert('Error: '+data.status);
     },
     data: defect
     });*/

    var flickerAPI = "http://iigjiragile.corp.emc.com:8080/rest/api/2/issue";

    $.getJSON(flickerAPI, {
        format: "jsonp"
    })
        .done(function (data) {
            console.log(data.status);
        })
        .fail(function (data) {
            /*$.each( data.items, function( i, item ) {
             $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
             if ( i === 3 ) {
             return false;
             }
             });*/
            console.log(data.status);
        });

    console.log("Done...");
}

function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
}

function createJiraIssue() {

    var datos = {
        "fields": {
            "project": {
                "key": "HELP"
            },
            "summary": "Test Ticket",
            "description": "Creating of an issue using project keys and issue type  names using the REST API",
            "issuetype": {
                "name": "Bug"
            },
            "assignee": {"name": "sim"}
        }
    };

    var parameters = JSON.stringify(datos);
    /*var req = $.getJSON({
        url: 'http://iigjiragile.corp.emc.com:8080/rest/api/2/issue',
        type: "POST",
        data: parameters,
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        processData: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', make_base_auth("madirv", "changeit3#"));
        },
        error: function (errmsg) {
            console.log('error ocured:' + errmsg);
        },
        success: function (text) {
            console.log('success:'+text);
        },

    });*/

    var req = $.ajax({
        url: 'http://wcu-jiraptst01.isus.emc.com:8080/rest/api/2/issue/demop-1/comment',
        type: "GET",
        //data: parameters,

        jsonp : false,
        jsonpCallback: 'jsonp-callback',

        contentType: "application/json; charset=utf-8",
        dataType: 'jsonp',
        async: false,
        processData: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', make_base_auth("madirv", "changeit3#"));
        },
        success: function (data, status, jqXHR) {
            console.log("Success >> "+data);
            console.log("Success >> "+status);
            console.log("Success >> "+jqXHR);
        },

        error: function (jqXHR, status) {
            console.log("Error >> "+jqXHR);
            console.log("Error >> "+status);
        }

    });

    console.log("Req >> "+JSON.stringify(req));
}

function addScreenshot() {


}

