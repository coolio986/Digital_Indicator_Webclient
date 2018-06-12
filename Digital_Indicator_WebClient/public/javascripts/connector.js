var SignalrConnection;
var ChatProxy;


$(document).ready(function () {

    ChatServerUrl = "http://localhost:8080/";
    var ChatUrl = ChatServerUrl + "signalr";
    //This will hold the connection to the signalr hub   
    SignalrConnection = $.hubConnection(ChatUrl, {
        useDefaultPath: false
    });
    //ChatProxy = SignalrConnection.createHubProxy('WebServiceHub');

    ChatProxy = SignalrConnection.createHubProxy('WebServiceHub');
    //This will be called by signalr   
    ChatProxy.on("ReceiveData", function (message) {
        //$('span').text(message);  
        //console.log(message);
        $('#filamentDiameter').text(message);
    });


    //connecting the client to the signalr hub   
    SignalrConnection.start().done(function () {
        //alert("Connected to Signalr Server");
    })
        .fail(function () {
            alert("failed in connecting to Digital_Indicator Server");
        })

});

function Connect() {
   
}

