

//var SignalrConnection;
//var ChatProxy;
var connection;
var hub;
var upperLimit;
var lowerLimit;
var nominalDiameter;


$(window).resize(function () {
    var update = {
        width: window.innerWidth,  // or any new width

    }
    Plotly.relayout('plotDiv', update);

});


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

    Plotly.plot('plotDiv', [{
        x: [],
        y: [],
        mode: 'lines',
        marker: { color: '#0099ff', size: 8 },
        line: { width: 2 },
        name: 'Actual Diameter'
    },
    {
        x: [],
        y: [],
        mode: 'lines',
        marker: { color: 'red', size: 2 },
        line: { width: 2 },
        name: 'Upper Limit'
    },
    {
        x: [],
        y: [],
        mode: 'lines',
        marker: { color: 'red', size: 2 },
        line: { width: 2 },
        name: 'Lower Limit'
    },
    {
        x: [],
        y: [],
        mode: 'lines',
        marker: { color: 'limegreen', size: 2 },
        line: { width: 2 },
        name: 'Nominal Diameter'
    }

    ]);

});

function RequestData() {


    hub.invoke('Send', connection.id, "");
}




function BuildData(message) {

    for (var i = 0; i < message.length; i++) {
        try {
            var obj = document.getElementById(message[i].Key)
            var newObj = obj.cloneNode(false);

            if (message[i].Key == "ActualDiameter") {
                AddPlotData(message[i].Value);
            }

            if (newObj.innerHTML !== message[i].Value) {
                newObj.innerHTML = message[i].Value;
            }

            //replace is more efficent
            obj.parentNode.replaceChild(newObj, obj);
        }
        //if item is not part of the DOM the try alternate method
        catch {
            switch (message[i].Key) {
                case "UpperLimit":
                    upperLimit = message[i].Value;
                    break;
                case "LowerLimit":
                    lowerLimit = message[i].Value;
                    break;
                case "NominalDiameter":
                    nominalDiameter = message[i].Value;
                    break;
                default:
                    break;
            }

        }
    }
    setTimeout(function () { RequestData(); }, 50);


}

function AddPlotData(y) {
    Plotly.extendTraces('plotDiv', {
        x: [[new Date().getTime() / 1000], [new Date().getTime() / 1000], [new Date().getTime() / 1000], [new Date().getTime() / 1000]],
        y: [[y], [upperLimit], [lowerLimit], [nominalDiameter]]
    }, [0, 1, 2, 3], 200)


}

function rand() {
    return Math.random();
}

