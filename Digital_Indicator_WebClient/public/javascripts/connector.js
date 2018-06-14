var SignalrConnection;
var ChatProxy;


$(document).ready(function () {
    var ip = location.hostname;
    

    ChatServerUrl = "http://192.168.2.53:8080/";

    //ChatServerUrl = "http://" + "192.168.2.53" + ":8080/";
    var ChatUrl = ChatServerUrl + "signalr";




    //This will hold the connection to the signalr hub
    SignalrConnection = $.hubConnection(ChatUrl, {
        useDefaultPath: false
    });
    //ChatProxy = SignalrConnection.createHubProxy('WebServiceHub');

    ChatProxy = SignalrConnection.createHubProxy('WebServiceHub');
    //This will be called by signalr   
    ChatProxy.on("ReceiveData", function (message) {

        BuildData(message);
        //$('span').text(message);  
        //console.log(message);
        
    });


    //connecting the client to the signalr hub   
    SignalrConnection.start().done(function () {
        //alert("Connected to Signalr Server");
    })
        .fail(function () {
            alert("failed in connecting to Digital_Indicator Server");
        })

});

function BuildData(message) {
    

    for (var i = 0; i < message.length; i++) {
        var obj = document.getElementById(message[i].Key)

        if (obj.innerHTML !== message[i].Value) {
            obj.innerHTML = message[i].Value;
        }

        // $('#' + message[i].Key).text(message[i].Value);
        //console.log(message[i].Key);
        //Do something
    }

}

