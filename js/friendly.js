var xmlHttp = createXmlHttpRequestObject();
var serverAddress = "friendly.php?action=getnews";
var updateInterval = 5;
var errorRetryInterval = 30;
var debugMode = true;

function createXmlHttpRequestObject() {
    var xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
                                        "MSXML2.XMLHTTP.5.0",
                                        "MSXML2.XMLHTTP.4.0",
                                        "MSXML2.XMLHTTP.3.0",
                                        "Microsoft.XMLHTTP");
        for (var i = 0, len = XmlHttpVersions.length; i < len; i++) {
            try {
                xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
            } catch (e) { }
        }
    }
    if (!xmlHttp) {
        alert("gagal mbuat objek XMLHttpRequest.");
    } else {
        return xmlHttp;
    }
}

function display($message) {
    myDiv = document.getElementById("myDivElement");
    myDiv.innerHTML = $message + "<br>";
}

function displayError($message) {
    display("gagal mendapatkan pesan. mencoba dalam " +
            errorRetryInterval + " detik. " +
            (debugMode ? "<br>" + $message : ""));
    setTimeout("process();", errorRetryInterval * 1000);
}

function handleRequestStateChange() {
   if (xmlHttp.readyState == 4) {
       if (xmlHttp.status == 200) {
           try {
               handleServerResponse();
           } catch (e) {
               alert("gagal baca respon : " + e.toString());
           }
       }
       else {
           alert("ada masalah ngambil data : " + xmlHttp.statusText);
       }
   }
}

function process() {
    if (xmlHttp) {
        /*
        return;
    }
    if (xmlHttp.readyState != 0 && xmlHttp.readState != 4) {
        alert("ndak bisa nyambung server.");
    } else {
    */
        try {
            display("ndapatin pesan dari server...");
            xmlHttp.open("GET", serverAddress, true);
            xmlHttp.onreadystatechange = handleGettingNews;
            xmlHttp.send(null);
        } catch (e) {
            //alert("tak dapat nyambung server. " + e.toString());
            displayError(e.toString());
        }
    }
}

function handleServerResponse() {
    var xmlResponse = xmlHttp.responseXML;
    if (!xmlResponse || !xmlResponse.documentElement) {
        throw("struktur xml invalid : " + xmlHttp.responseText);
    }
    var rootNodeName = xmlResponse.documentElement.nodeName;
    if (rootNodeName == "parseerror") {
        throw("struktur xml tak valid. " + xmlHttp.responseText);
    }
    xmlRoot = xmlResponse.documentElement;
    if (rootNodeName != "response" || !xmlRoot.firstChild) {
        throw("struktur ndak valid." + xmlHttp.responseText);
    }
    responseText = xmlRoot.firstChild.data;
    myDiv = document.getElementById("myDivElement");
    myDiv.innerHTML = "server bilang : " + responseText;
}

function handleGettingNews() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            try {
                getNews();
            } catch (e) {
                displayError(e.toString());
            }
        }
        else {
            displayError(xmlHttp.statusText);
        }
    }
}

function getNews() {
    var response = xmlHttp.responseText;
    if (response.indexOf("ERRNO") >= 0
        || response.indexOf("error") >= 0
        || response.length == 0) {
        throw(response.length == 0 ? "server error." : response);
    }
    display(response);
    setTimeout("process();", updateInterval * 1000);
}
