

//var SignalrConnection;
//var ChatProxy;
var connection;
var hub;



$(document).ready(function () {
    var ip = location.hostname;
    ChatServerUrl = "http://" + ip + ":8080/";
    var ChatUrl = ChatServerUrl + "signalr";

    $.connection.hub.url = ChatUrl;
    
    $.connection.hub.useDefaultPath = false;
    connection = $.hubConnection(ChatUrl, {
        useDefaultPath: false
    });
    hub = connection.createHubProxy('WebServiceHub');
    chat = $.connection.WebServiceHub;

    


    connection.logging = true;
    connection.start().done(function () {
        //console.log('Now connected, connection ID=' + connection.id);
        RequestData();

    })
        .fail(function (a) {
            console.log('Could not connect' + a);
        });


    hub.on('RecieveData', function (message) {
        BuildData(message);
    });

    ////This will hold the connection to the signalr hub
    //SignalrConnection = $.hubConnection(ChatUrl, {
    //    useDefaultPath: false
    //});
    //SignalrConnection.logging = true;
    ////ChatProxy = SignalrConnection.createHubProxy('WebServiceHub');

    //ChatProxy = SignalrConnection.createHubProxy('WebServiceHub');
    ////This will be called by signalr   
    //ChatProxy.on("receiveData", function (message) {

    //    BuildData(message);
    //    //$('span').text(message);  
    //    //console.log(message);
        
    //});

    
    ////connecting the client to the signalr hub   
    //SignalrConnection.start().done(function () {
    //    //alert("Connected to Signalr Server");
    //    RequestData();
    //})
    //    .fail(function () {
    //        alert("failed in connecting to Digital_Indicator Server");
    //    })

});

function RequestData() {

    
    hub.invoke('Send', connection.id, "");
}




function BuildData(message) {

    for (var i = 0; i < message.length; i++) {
        var obj = document.getElementById(message[i].Key)
        var newObj = obj.cloneNode(false);

        if (newObj.innerHTML !== message[i].Value) {
        newObj.innerHTML = message[i].Value;
        }

        //replace is more efficent
        obj.parentNode.replaceChild(newObj, obj);
    }
    setTimeout(function () { RequestData(); }, 50);
    

}

